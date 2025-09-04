const { GENERIC_ERROR_MSG } = require('../constants/errorMessages')

const createGenericErrorResponse = (h) => {
  return h.response({
    status: 500,
    errorMessage: GENERIC_ERROR_MSG
  }).header('Cache-Control', 'no-cache, no-store, must-revalidate')
}

module.exports = { createGenericErrorResponse }
