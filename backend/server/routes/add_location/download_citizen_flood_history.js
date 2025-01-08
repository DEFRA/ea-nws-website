const {
  getDownloadCitizenFloodHistoryUrl
} = require('../../services/DownloadCitizenFloodHistory')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/locations/download_citizen_flood_history',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const response = await getDownloadCitizenFloodHistoryUrl()
        return h.response(response)
      } catch {
        createGenericErrorResponse(h)
      }
    }
  }
]
