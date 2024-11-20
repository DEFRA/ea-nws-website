const path = require('path')
const {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  GetObjectCommand,
  S3LocationFilterSensitiveLog
} = require('@aws-sdk/client-s3')
const getSecretKeyValue = require('../../services/SecretsManager')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const DBFReader = require('dbf-reader')

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
        console.log('Beginning shapefile validation')

        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { zipFileName } = request.payload
        zipFilePath = `zip-uploads/${zipFileName}`
        const bucketFolder = zipFilePath.replace('.zip', '/')
        s3Client = new S3Client()
        s3BucketName = await getSecretKeyValue('nws/aws', 'bulkUploadBucket')

        console.log(`Zip file: ${zipFileName}`)
        console.log(`Zip path: ${zipFilePath}`)
        console.log(`Bucket folder: ${bucketFolder}`)

        // List bucket folder contents
        const response = await s3Client.send(
          new ListObjectsV2Command({
            Bucket: s3BucketName,
            Prefix: bucketFolder
          })
        )
        Contents = response.Contents
        console.log(Contents)

        /*** Check 1: empty zip file ***/
        if (!Contents || Contents.length === 0) {
          throw new Error('The file is empty')
        }

        /*** Check 2: all prefixes match ***/
        const prefixes = Contents.map((item) => {
          const fileName = item.Key.replace(bucketFolder, '')
          return fileName.split('.')[0]
        })
        const uniquePrefixes = new Set(prefixes)
        console.log(`uniquePrefixes: ${Array.from(uniquePrefixes)}`)
        if (uniquePrefixes.size > 1) {
          throw new Error(
            'Each file in the ZIP must have the same prefix, for example, locations.shp, locations.shx or locations.dbf'
          )
        }

        /*** Check 3: required files ***/
        const requiredFilesTypes = ['.shp', '.shx', '.dbf']
        const presentFileTypes = Contents.map((item) => {
          const fileType = item.Key.slice(item.Key.lastIndexOf('.'))
          return fileType
        })
        for (let required of requiredFilesTypes) {
          if (!presentFileTypes.includes(required)) {
            throw new Error(
              'The ZIP file must contain .shp (main file), .shx (index file) and .dbf (database file)'
            )
          }
        }

        console.log(Contents)

        /*** Check 4: no location name ***/
        // Retrieve dbf file from bucket (know it exists from Check 3)
        const dbfResponse = await s3Client.send(
          new GetObjectCommand({
            Bucket: s3BucketName,
            Key: Contents.find((item) => item.Key.endsWith('.dbf'))
          })
        )
        const dbfBuffer = await dbfResponse.Body.transformToByteArray()
        const dbfData = new DBFReader(dbfBuffer)

        // Check if location name exists and has data
        const records = dbfData.getRecords()
        const hasValidLocation = records.some(
          (record) => record.LocationName && record.LocationName.trim() !== ''
        )
        if (!hasValidLocation) {
          throw new Error(
            'The selected file could not be uploaded because the location name is missing'
          )
        }

        /*** No errors thrown means a valid shapefile ***/
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
            console.log(`objectsToDelete: ${JSON.stringify(objectsToDelete)}`)
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
        console.log(error)
        return h.response({
          status: 500,
          errorMessage: error.message
        })
      }
    }
  }
]
