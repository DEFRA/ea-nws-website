const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const getSecretKeyValue = require('../../services/SecretsManager')

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
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

        const body = request.payload

        // const { name } = request.payload
        // const name = request.payload.get('name')
        // const uniqFileName = Date.now() + '_' + name
        const uniqFileName = 'uniqFileName'

        // Change to nws/aws (bulkUploadBucket).
        // Would probably need the bucket to be configured correctly (see nws/website/organisation)
        const s3Bucket = await getSecretKeyValue(
          'nws/website/organisation',
          'uploadS3Bucket'
        )

        const params = {
          Body: body,
          Bucket: s3Bucket,
          Key: uniqFileName
        }

        const command = new PutObjectCommand(params)
        client.send(command)

        return {
          status: 200,
          data: uniqFileName
        }
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
