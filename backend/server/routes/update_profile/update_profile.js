const { apiCall } = require("../../services/ApiService")

module.exports = [
  {
    method: ["POST"],
    path: "/api/profile/update",

    handler: async (request, h) => {
      try {
        const { profile } = request.payload
        // check profile is not empty - this should never happen
        // as a profile should always be passed to this route
        if (Object.keys(profile).length !== 0) {
          const response = await apiCall(
            request.payload,
            "member/updateProfile"
          )
          return h.response(response)
        } else {
          return h.response({ status: 400 })
        }
      } catch (error) {
        return h.response({
          status: 500,
          errorMessage: "Oops, something happened!"
        })
      }
    }
  }
]
