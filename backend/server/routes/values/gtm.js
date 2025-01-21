const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const getSecretKeyValue = require('../../services/SecretsManager')

module.exports = [
  {
    method: ['POST'],
    path: '/api/values/gtm',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const response = await getSecretKeyValue('nws/website', 'gtmId')
        if (response !== null && response.length >= 0) {
          return {
            status: 200,
            data: response
          }
        } else {
          return {
            status: 500,
            errorMessage: 'gtmId has no value!'
          }
        }
      } catch (error) {
        logger.error(error)
        createGenericErrorResponse(h)
      }
    }
  }
]
