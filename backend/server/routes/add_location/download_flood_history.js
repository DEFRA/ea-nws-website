const { logger } = require('../../plugins/logging')
const {
  getDownloadFloodHistoryUrl
} = require('../../services/DownloadFloodHistory')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/locations/download_flood_history',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const response = await getDownloadFloodHistoryUrl()
        return h.response(response)
      } catch (error) {
        logger.error(error)
        createGenericErrorResponse(h)
      }
    }
  }
]
