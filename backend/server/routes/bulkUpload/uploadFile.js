const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const getSecretKeyValue = require('../../services/SecretsManager')

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedURL } = require('@aws-sdk/s3-request-presigner')

const client = new S3Client()

module.exports = [
  {
    method: ['POST'],
    path: '/api/bulkUpload/uploadFile',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { name, fileType } = request.query
        const uniqFileName = `${name}_${Date.now()}`

        const client = new S3Client()

        // Change to nws/aws (bulkUploadBucket).
        // Would probably need the bucket to be configured correctly (see nws/website/organisation)
        const s3BucketName = await getSecretKeyValue(
          'nws/website/organisation',
          'uploadS3Bucket'
        )

        if (!s3BucketName) {
          console.error('S3 Bucket value undefined in Secrets Manager')
          return createGenericErrorResponse(h)
        }

        const params = {
          Bucket: s3BucketName,
          Key: uniqFileName,
          ContentType: fileType
        }

        const command = new PutObjectCommand(params)

        // Generate pre-signed URL that will allow frontend to upload file
        const signedURL = await getSignedURL(client, command)

        return h.response({
          status: 200,
          url: signedURL,
          fileName: uniqFileName
        })
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
