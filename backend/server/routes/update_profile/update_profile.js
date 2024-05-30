const { apiCall } = require('../../services/ApiService')

module.exports = [
  {
    method: ['POST'],
    path: '/profile/update',

    handler: async (request, h) => {
      try {
        const { profile } = request.payload

        console.log('profile', profile)
        // check profile is not empty - this should never happen
        // as a profile should always be passed to this route
        if (Object.keys(profile).length !== 0) {
          // request.payload = { authToken, msisdn }
          const response = await apiCall(
            request.payload,
            'member/updateProfile'
          )
          return h.response({ data: response.data })
        } else {
          return h.response({ status: 400 })
        }
      } catch (error) {
        console.log('3')
        return h.response({
          status: 500,
          errorMessage: 'Oops, something happened!'
        })
      }
    }
  }
]
