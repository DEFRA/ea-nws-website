const { logger } = require('../../plugins/logging')
const { getDownloadTemplateUrl } = require('../../services/DownloadAssetURLs')
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
      } catch (error) {
        logger.error(error)
        createGenericErrorResponse(h)
      }
    }
  }
]
