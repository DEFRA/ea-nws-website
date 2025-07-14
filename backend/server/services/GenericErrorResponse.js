const createGenericErrorResponse = (h) => {
  return h.response({
    status: 500,
    errorMessage:
      'The system encountered an unexpected error'
  })
}

module.exports = { createGenericErrorResponse }
