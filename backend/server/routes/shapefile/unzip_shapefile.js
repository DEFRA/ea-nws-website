const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand
} = require('@aws-sdk/client-s3')
const unzipper = require('unzipper')
const { PassThrough, pipeline } = require('stream')
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

        const { zipFileName } = request.payload
        if (!zipFileName) {
          return h.response({
            status: 500,
            message: 'No zip file provided'
          })
        }
        const zipFileKey = `zip-uploads/${zipFileName}`
        const client = new S3Client()
        const s3BucketName = await getSecretKeyValue(
          'nws/aws',
          'bulkUploadBucket'
        )

        // Retrieve zip file from S3
        const zipFileStream = await client.send(
          new GetObjectCommand({
            Bucket: s3BucketName,
            Key: zipFileKey
          })
        ).Body

        const outputFolder = `${zipFileKey.replace('.zip', '/')}`

        // Unzip and upload each file back to bucket
        await new Promise((resolve, reject) => {
          pipeline(
            zipFileStream,
            unzipper.Parse(),
            async (entryStream) => {
              for await (const entry of entryStream) {
                const filePath = `${outputFolder}${entry.path}`
                const uploadStream = new PassThrough()
                await client.send(
                  new PutObjectCommand({
                    Bucket: s3BucketName,
                    Key: filePath,
                    Body: uploadStream
                  })
                )
                entry.pipe(uploadStream)
              }
            },
            (error) => {
              if (error) reject(new Error(`Pipeline Error: ${error.message}`))
              else resolve()
            }
          )
        })

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
