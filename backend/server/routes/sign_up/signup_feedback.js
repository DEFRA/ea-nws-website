module.exports = [
  {
    method: ['POST'],
    path: '/api/signup/feedback',
    handler: async (request, h) => {
      try {
        if (request.payload === null) {
          return h.response({ message: 'Bad request' }).code(400)
        }

        const { feedbackPreference, feedbackText } = request.payload

        if (feedbackPreference === null || feedbackText === '') {
          return h.response({ message: 'Bad request' }).code(400)
        }

        request.log('info', ['***FEEDBACK***', request.payload])

        return h.response({ status: 200 }).code(200)
      } catch (error) {
        console.error('Error:', error)
        return h.response({ message: 'Internal server error' }).code(500)
      }
    }
  }
]
