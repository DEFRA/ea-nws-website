const {
  S3Client,
  GetObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  InventoryS3BucketDestinationFilterSensitiveLog
} = require('@aws-sdk/client-s3')
const unzipper = require('unzipper')
const { PassThrough } = require('stream')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/shapefile/unzip',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { fileName } = request.payload

        if (fileName) {
          const client = new S3Client()
          const s3BucketName = await getSecretKeyValue(
            'nws/aws',
            'bulkUploadBucket'
          )

          if (!s3BucketName) {
            console.error('S3 Bucket value undefined in Secrets Manager')
            return h.response({ status: 500, message: 'Secret error' })
          }

          const zipFilePath = `zip-uploads/${fileName}`
          const outputFolder = `zip-uploads/${fileName.replace('.zip', '')}/`

          // Retrieve zip file from bucket
          const getObjectCmd = new GetObjectCommand({
            Bucket: s3BucketName,
            Key: zipFilePath
          })
          const zipFileStream = await client.send(getObjectCmd)

          // Unzip and send each file back to bucket
          const unzipStream = zipFileStream.Body.pipe(unzipper.Parse())
          for await (const entry of unzipStream) {
            const { path: filePath, type } = entry
            if (type === 'File') {
              // Create stream to upload each extracted file
              const passThroughStream = new PassThrough()
              const uploadParams = {
                Bucket: s3BucketName,
                Key: `${outputFolder}${filePath}`,
                Body: passThroughStream
              }

              // Start multipart upload
              const uploadCmd = new CreateMultipartUploadCommand(uploadParams)
              const uploadResponse = await client.send(uploadCmd)
              entry.pipe(passThroughStream)

              // Complete upload
              await client.send(
                new CompleteMultipartUploadCommand({
                  Bucket: s3BucketName,
                  Key: `${outputFolder}${filePath}`,
                  UploadId: uploadResponse.UploadId
                })
              )
            } else {
              // Skip non-files
              entry.autodrain()
            }
          }
        }

        return h.response({
          status: 200,
          message: 'Files unzipped and uploaded successfully'
        })
      } catch (error) {
        return h.response({
          status: 500,
          message: error
        })
      }
    }
  }
]
