const { logger } = require('../../plugins/logging')
const {
  getDownloadOrgFloodHistoryUrl
} = require('../../services/DownloadOrgFloodHistory')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/locations/download_org_flood_history',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const response = await getDownloadOrgFloodHistoryUrl()
        return h.response(response)
      } catch (error) {
        logger.error(error)
        createGenericErrorResponse(h)
      }
    }
  }
]
