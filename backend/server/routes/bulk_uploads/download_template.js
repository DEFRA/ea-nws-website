const { getDownloadTemplateUrl } = require('../../services/DownloadTemplate')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/bulk_uploads/download_template',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const response = await getDownloadTemplateUrl()
        return h.response(response)
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
