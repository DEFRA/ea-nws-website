
  module.exports = [
    {
      method: ['POST'],
      path: '/signup/feedback',
      handler: async (request, h) => {
          try {
            if (request.payload === undefined) {
              return h.response({ message: 'Bad request' }).code(400)
            }
            console.log("request", request)
            const {feedbackPreference, feedbackText} = request.payload
            console.log("feedback data", feedbackText)
  
            //need to add in pino logging to store the data
            request.log(['info'], 'logging feedback data here')
            request.log(['info'], request.payload)
            console.log("feedback data logged", request.payload)
            
            return request.payload
          } catch (error) {
            console.error('Error:', error)
            return h.response({ message: 'Internal server error' }).code(500)
          }
        
        } 
    }
  ]
  