const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const getSecretKeyValue = require('../../services/SecretsManager')

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

module.exports = [
  {
    method: ['POST'],
    path: '/api/bulkUpload/uploadFile',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { name, fileType } = request.payload

        if (name && fileType) {
          const uniqFileName = `${Date.now()}_${name}`

          const client = new S3Client()

          // Change to nws/aws (bulkUploadBucket).
          // Would probably need the bucket to be configured correctly (see nws/website/organisation)
          const s3BucketName = await getSecretKeyValue(
            'nws/website/organisation',
            'uploadS3Bucket'
          )

          console.log(s3BucketName)

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

          console.log(command)

          // Generate pre-signed URL that will allow frontend to upload file
          const signedURL = await getSignedUrl(client, command)

          console.log(signedURL)

          return h.response({
            status: 200,
            data : {url: signedURL,
            fileName: uniqFileName}
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
