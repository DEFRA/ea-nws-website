const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

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

        const { name, body } = request.payload
        const uniqFileName = Date.now() + '_' + name

        const params = {
          // Body: body,
          Bucket: 'jibrantest',
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
