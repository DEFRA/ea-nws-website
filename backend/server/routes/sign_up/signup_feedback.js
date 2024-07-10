module.exports = [
  {
    method: ['POST'],
    path: '/api/signup/feedback',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return h
            .response({ errorMessage: 'Oops, something happened!' })
            .code(400)
        }

        const { feedbackPreference, feedbackText } = request.payload

        if (!feedbackPreference || !feedbackText) {
          return h.response().code(400)
        }

        request.log('info', ['***FEEDBACK***', request.payload])

        return h.response()
      } catch (error) {
        console.error('Error:', error)
        return h
          .response({ errorMessage: 'Oops, something happened!' })
          .code(500)
      }
    }
  }
]
