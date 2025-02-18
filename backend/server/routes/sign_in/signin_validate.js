const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const {
  authCodeValidation
} = require('../../services/validations/AuthCodeValidation')
const { orgSignIn, addLinkedLocations } = require('../../services/elasticache')
const { logger } = require('../../plugins/logging')

module.exports = [
  {
    method: ['POST'],
    path: '/api/sign_in_validate',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { signinToken, code, signinType } = request.payload
        const { error, code: formattedCode } = authCodeValidation(code)

        if (!error && signinToken) {
          const response = await apiCall(
            { signinToken: signinToken, code: formattedCode },
            'member/signinValidate'
          )

          if (signinType === 'org') {
            const signupComplete = response.data.profile.additionals?.find(
              (additional) => additional.id === 'signupComplete'
            )

            if (signupComplete?.value?.s === 'pending') {
              return h.response({
                status: 500,
                errorMessage: 'account pending'
              })
            }
            const locationRes = await apiCall(
              { authToken: response.data.authToken },
              'location/list'
            )
            const contactRes = await apiCall(
              { authToken: response.data.authToken },
              'organization/listContacts'
            )

            // Send the profile to elasticache
            await orgSignIn(response.data.profile, response.data.organization, locationRes.data.locations, contactRes.data.contacts)

            for (const contact of contactRes.data.contacts) {
              const options = { contactId: contact.id }
              const linkLocationsRes = await apiCall(
                {
                  authToken: response.data.authToken,
                  options: options
                },
                'location/list'
              )

              const locationIDs = []
              linkLocationsRes.data.locations.forEach(function (location) {
                locationIDs.push(location.id)
              })

              await addLinkedLocations(response.data.organization.id, contact.id, locationIDs)
            }
          }
          return h.response(response)
        } else {
          return h.response({
            status: 500,
            errorMessage: !error ? 'Oops, something happened!' : error
          })
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
