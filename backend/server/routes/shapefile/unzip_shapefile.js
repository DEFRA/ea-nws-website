const {
  S3Client,
  GetObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand
} = require('@aws-sdk/client-s3')
const unzipper = require('unzipper')
const { PassThrough } = require('stream')
const { CLIENT_RENEG_WINDOW } = require('tls')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

// Unzips file in chunks and sends output to new folder within bucket
async function unzipStreamToS3(client, zipStream, bucketName, folderName) {
  for await (const entry of zipStream.pipe(unzipper.Parse())) {
    const { path: entryName, type } = entry

    if (type === 'File') {
      const uploadKey = `${folderName}${entryName}`

      const createUploadParams = {
        Bucket: bucketName,
        Key: uploadKey,
        ContentType: 'application/octet-stream'
      }
      const createUploadResponse = await client.send(
        new CreateMultipartUploadCommand(createUploadParams)
      )

      const uploadID = createUploadResponse.UploadId
      const partNum = 1
      const passThroughStream = new PassThrough()
      const uploadPartParams = {
        Bucket: bucketName,
        Key: uploadKey,
        UploadId: uploadID,
        PartNumber: partNum,
        Body: passThroughStream
      }

      entry.pipe(passThroughStream)
      const uploadPartResponse = await client.send(
        new UploadPartCommand(uploadPartParams)
      )

      // Complete upload
      const completeMutipartParams = {
        Bucket: bucketName,
        Key: uploadKey,
        UploadId: uploadID,
        MultipartUpload: {
          Parts: [
            {
              ETag: uploadPartResponse.ETag,
              PartNumber: partNum
            }
          ]
        }
      }
      await client.send(
        new CompleteMultipartUploadCommand(completeMutipartParams)
      )
    }
    // Skip directories or non-file entries
    else {
      entry.autodrain()
    }
  }
}

module.exports = [
  {
    method: ['POST'],
    path: '/api/shapefile/unzip',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return h.response({ status: 500, message: 'Payload error' })
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

          const getObjectParams = {
            Bucket: s3BucketName,
            Key: `zip-uploads/${fileName}`
          }
          const zipStream = await client.send(
            new GetObjectCommand(getObjectParams)
          )

          const folderName = `zip-uploads/${fileName.replace('.zip', '')}/`

          await unzipStreamToS3(
            client,
            zipStream.Body,
            s3BucketName,
            folderName
          )

          return h.response({
            status: 200,
            message: 'File successfully unzipped and unloaded'
          })
        } else {
          return h.response({
            status: 500,
            message: 'File name not provided'
          })
        }
      } catch (error) {
        return h.response({
          status: 500,
          message: error
        })
      }
    }
  }
]
