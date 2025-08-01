const { GENERIC_ERROR_MSG } = require('../constants/errorMessages')

const createGenericErrorResponse = (h) => {
  return h.response({
    status: 500,
    errorMessage: GENERIC_ERROR_MSG
  })
}

module.exports = { createGenericErrorResponse }
