const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

module.exports = [
  {
    method: ['POST'],
    path: '/api/signup/feedback',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { feedbackPreference, feedbackText } = request.payload

        if (!feedbackPreference || !feedbackText) {
          return h.response({
            status: 500,
            errorMessage: 'Please leave some feedback'
          })
        }

        request.log('info', ['***FEEDBACK***', request.payload])

        return h.response({ status: 200 })
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
