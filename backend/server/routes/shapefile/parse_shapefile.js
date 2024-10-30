const {
  S3Client,
  GetObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand
} = require('@aws-sdk/client-s3')
const unzipper = require('unzipper')
const stream = require('stream')

module.exports = [
  {
    method: ['POST'],
    path: '/api/shapefile/parse',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          createGenericErrorResponse(h)
        }

        const { name, fileType } = request.payload

        if (name && fileType) {
          const zipFileKey = `${Date.now()}_${name}`

          const client = new S3Client()
          const s3BucketName = '#' // Probably want to retrieve this from secrets manager

          // Stream zip file from S3
          const zippedFileStream = client.send(
            new GetObjectCommand({
              Bucket: s3BucketName,
              Key: zipFileKey
            })
          ).Body
          const passThroughStream = new stream.PassThrough()

          // Process zip file
          zippedFileStream.pipe(unzipper.Parse()).on('entry', async (entry) => {
            const { path: fileName } = entry
            if (
              !fileName.endsWith('.shp') &&
              !fileName.endsWith('.dbf') &&
              !fileName.endsWith('shx')
            ) {
              entry.autodrain() // Skip non-shapefiles
              return
            }
          })
        } else {
          return h.response({
            status: 500,
            errorMessage: 'File name and/or type not provided'
          })
        }
      } catch (error) {
        createGenericErrorResponse(h)
      }
    }
  }
]
