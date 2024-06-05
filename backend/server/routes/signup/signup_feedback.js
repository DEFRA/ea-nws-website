
  module.exports = [
    {
      method: ['POST'],
      path: '/signup_feedback',
      handler: async (request, h) => {
        
          const { feedbackData } = request.payload
          console.log("feedback data", feedbackData)

          //need to add in pino logging to store the data
        } 
    }
  ]
  