
  module.exports = [
    {
      method: ['POST'],
      path: '/api/signup/feedback',
      handler: async (request, h) => {
        try {
          if (request.payload === null) {
            return h.response({ message: 'Bad request' }).code(400)
          }
          const {feedbackPreference, feedbackText} = request.payload
  
          request.log(['info'], 'logging feedback data here')
          request.log(['info'], request.payload)
          
          return request.payload
        } catch (error) {
          console.error('Error:', error)
          return h.response({ message: 'Internal server error' }).code(500)
        }
      } 
    }
  ]
  