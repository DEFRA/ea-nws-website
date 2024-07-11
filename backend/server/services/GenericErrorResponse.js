const createGenericErrorResponse = (h) => {
  return h.response({
    status: 500,
    errorMessage: 'Oops, something happened!'
  })
}

module.exports = { createGenericErrorResponse }
