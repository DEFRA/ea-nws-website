const {
  S3Client,
  GetObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand
} = require('@aws-sdk/client-s3')
const unzipper = require('unzipper')
const stream = require('stream')
const { CLIENT_RENEG_WINDOW } = require('tls')
const { createGenericErrorResponse } = require('../../services/GenericErrorResponse')

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

            // Prepare for multipart upload to S3
            const multipartUpload = await client.send(new CreateMultipartUploadCommand {
              Bucket: s3BucketName,
              Key: `unzipped/${fileName}`,
              ContentType: 'application/octet-stream'
            })
            let chunkNum = 1
            const uploadPromises =[]
            const bufferStream = new stream.PassThrough

            entry.pipe(bufferStream)
              .on('data', async (chunk) => {
                const uploadPartParams = {
                  Bucket: s3BucketName,
                  Key: `unzipped/${fileName}`,
                  UploadId: multipartUpload.UploadId,
                  PartNumber: partNumber,
                  Body: chunk
                }
                uploadPromises.push(client.send(new UploadPartCommand(uploadPartParams)))
                chunkNum += 1
              })
              .on('end', async () => {
                const completedUpload = await Promise.all(uploadPromises)
                const completedParams = {
                  Bucket: s3BucketName,
                  Key: `unzipped/${fileName}`,
                  UploadId: multipartUpload.UploadId,
                  MultipartUpload: {
                    Parts: completedUpload.map((part, i) => ({
                      ETag: part.ETag,
                      PartNumber: i + 1
                    }))
                }}
                await client.send(new CompleteMultipartUploadCommand(completedParams))
              })
              .on('error', (err) => {
                console.log("Error streaming zip: ", err)
                createGenericErrorResponse(h)
              })
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
