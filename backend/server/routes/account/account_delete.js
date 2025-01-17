import { logger } from '../../plugins/logging'
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/account/delete',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken } = request.payload

        if (authToken) {
          const response = await apiCall(
            { authToken: authToken },
            'member/deleteAccount'
          )
          return h.response(response)
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
