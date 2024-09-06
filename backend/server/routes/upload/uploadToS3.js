const { uploadToBucket } = require('../../services/LPM-S3-Transfer')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['PUT'],
    path: '/api/upload/uploadToS3',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const response = await uploadToBucket(request.payload, 'laurentpeny')
        console.log('laurent - uploadToS3: uploadToBucket')
        console.log(request.payload)
        console.log(response)
        return h.response(response)
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
