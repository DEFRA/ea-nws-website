const { logger } = require('../../plugins/logging')
const {
  getDownloadTemplateUrl,
  getDownloadQuickStartUrl
} = require('../../services/DownloadAssetURLs')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/info/download_guide',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const response = await getDownloadQuickStartUrl()
        return h.response(response)
      } catch (error) {
        logger.error(error)
        createGenericErrorResponse(h)
      }
    }
  }
]
