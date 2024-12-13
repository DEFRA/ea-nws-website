const {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  GetObjectCommand
} = require('@aws-sdk/client-s3')
const getSecretKeyValue = require('../../services/SecretsManager')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { Dbf } = require('dbf-reader')

const streamToBuffer = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
    stream.on('error', reject)
  })
}

module.exports = [
  {
    method: ['POST'],
    path: '/api/shapefile/validate',
    handler: async (request, h) => {
      // Variables that may need accessed in the catch cleanup
      let s3Client
      let Contents = []
      let s3BucketName = ''
      let zipFilePath = ''
      let errorsArray = []

      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { zipFileName } = request.payload
        zipFilePath = `zip-uploads/${zipFileName}`
        const bucketFolder = zipFilePath.replace('.zip', '/')
        s3Client = new S3Client()
        s3BucketName = await getSecretKeyValue('nws/aws', 'bulkUploadBucket')

        console.log('Beginning validation')
        // List bucket folder contents
        const response = await s3Client.send(
          new ListObjectsV2Command({
            Bucket: s3BucketName,
            Prefix: bucketFolder
          })
        )
        Contents = response.Contents

        // ***  Check 1: empty zip file *** //
        console.log(`Performing check 1`)
        if (!Contents || Contents.length === 0) {
          errorsArray.push('The file is empty')
          console.log(`Failed check 1. errorsArray: ${errorsArray}`)
        }

        // ***  Check 2: all prefixes match *** //
        console.log('Performing check 2')
        const prefixes = Contents.map((item) => {
          const fileName = item.Key.replace(bucketFolder, '')
          return fileName.split('.')[0]
        })
        const uniquePrefixes = new Set(prefixes)
        if (uniquePrefixes.size > 1) {
          errorsArray.push(
            'Each file in the ZIP must have the same prefix, for example, locations.shp, locations.shx or locations.dbf'
          )
          console.log(`Failed check 2. errorsArray: ${errorsArray}`)
        }

        // ***  Check 3: required files *** //
        console.log('Performing check 3')
        const requiredFilesTypes = ['.shp', '.shx', '.dbf']
        const presentFileTypes = Contents.map((item) => {
          const fileType = item.Key.slice(item.Key.lastIndexOf('.'))
          return fileType
        })
        for (const required of requiredFilesTypes) {
          if (!presentFileTypes.includes(required)) {
            errorsArray.push(
              'The ZIP file must contain .shp (main file), .shx (index file) and .dbf (database file)'
            )
            console.log(`Failed check 3. errorsArray: ${errorsArray}`)
          }
        }

        // ***  Check 4: no location name *** //
        // Retrieve dbf file from bucket (know it exists from Check 3)
        try {
          console.log('Performing check 4')
          const dbfResponse = await s3Client.send(
            new GetObjectCommand({
              Bucket: s3BucketName,
              Key: Contents.find((item) => item.Key.endsWith('.dbf'))?.Key
            })
          )
          const dbfBuffer = await streamToBuffer(dbfResponse.Body)
          const dbfTable = Dbf.read(dbfBuffer)
          if (dbfTable) {
            // Find the index of the 'lrf15nm' column (which stores the location name)
            const locationIndex = dbfTable.columns.findIndex(
              (col) => col.name === 'lrf15nm'
            )
            // Retrieve the location name value and ensure it is not null
            const locationName =
              dbfTable.rows[0][dbfTable.columns[locationIndex].name]
            if (!locationName) {
              throw new Error()
            }
          }
        } catch (e) {
          errorsArray.push(
            'The selected file could not be uploaded because the location name is missing'
          )
          console.log(`Failed check 4. errorsArray: ${errorsArray}`)
        }

        // *** TODO: Implement virus scan after EAN-1122 is complete *** //

        console.log(`Errors array: ${errorsArray}`)
        // If any errors, return them (done in catch block to include the clean up)
        if (errorsArray.length > 0) {
          throw new Error()
        }

        // No errors thrown means a valid shapefile
        return h.response({
          status: 200
        })
      } catch (error) {
        // An invalid shapefile (and the original zip) should be deleted from the bucket (the user will be asked to upload a correct one)
        try {
          if (Contents.length > 0) {
            const objectsToDelete = [
              ...Contents.map((item) => ({ Key: item.Key })),
              { Key: zipFilePath }
            ]
            await s3Client.send(
              new DeleteObjectsCommand({
                Bucket: s3BucketName,
                Delete: {
                  Objects: objectsToDelete
                }
              })
            )
          }
        } catch (err) {
          console.log(err)
        }
        console.log(`Error: ${error}`)
        console.log(`errorsArray: ${errorsArray}`)
        return h.response({
          status: 500,
          errorMessage: errorsArray
        })
      }
    }
  }
]
