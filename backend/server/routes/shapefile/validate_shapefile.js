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

      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { zipFileName } = request.payload
        zipFilePath = `zip-uploads/${zipFileName}`
        const bucketFolder = zipFilePath.replace('.zip', '/')
        s3Client = new S3Client()
        s3BucketName = await getSecretKeyValue('nws/aws', 'bulkUploadBucket')

        // List bucket folder contents
        const response = await s3Client.send(
          new ListObjectsV2Command({
            Bucket: s3BucketName,
            Prefix: bucketFolder
          })
        )
        Contents = response.Contents

        // ***  Check 1: empty zip file *** //
        if (!Contents || Contents.length === 0) {
          throw new Error('The file is empty')
        }

        // ***  Check 2: all prefixes match *** //
        const prefixes = Contents.map((item) => {
          const fileName = item.Key.replace(bucketFolder, '')
          return fileName.split('.')[0]
        })
        const uniquePrefixes = new Set(prefixes)
        if (uniquePrefixes.size > 1) {
          throw new Error(
            'Each file in the ZIP must have the same prefix, for example, locations.shp, locations.shx or locations.dbf'
          )
        }

        // ***  Check 3: required files *** //
        const requiredFilesTypes = ['.shp', '.shx', '.dbf']
        const presentFileTypes = Contents.map((item) => {
          const fileType = item.Key.slice(item.Key.lastIndexOf('.'))
          return fileType
        })
        for (const required of requiredFilesTypes) {
          if (!presentFileTypes.includes(required)) {
            throw new Error(
              'The ZIP file must contain .shp (main file), .shx (index file) and .dbf (database file)'
            )
          }
        }

        // ***  Check 4: no location name *** //
        // Retrieve dbf file from bucket (know it exists from Check 3)
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
            throw new Error(
              'The selected file could not be uploaded because the location name is missing'
            )
          }
        }

        // *** TODO: Implement virus scan after EAN-1122 is complete *** //

        // No errors thrown means a valid shapefile
        return h.response({
          status: 200,
          data: 'Valid'
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
        return h.response({
          status: 500,
          errorMessage: error.message
        })
      }
    }
  }
]
