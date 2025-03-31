const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { orgSignIn, addLinkedLocations, setJsonData } = require('../../services/elasticache')
const { logger } = require('../../plugins/logging')

module.exports = [
  {
    method: ['POST'],
    path: '/api/org_signin',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { orgData } = request.payload

        if (orgData) {
            const elasticacheKey = 'signin_status:' + orgData.authToken
            await setJsonData(elasticacheKey, { stage: 'Retrieving locations', status: 'working' })   
            const locationRes = await apiCall(
              { authToken: orgData.authToken },
              'location/list'
            )
            await setJsonData(elasticacheKey, { stage: 'Retrieving contacts', status: 'working' })   
            const contactRes = await apiCall(
              { authToken: orgData.authToken },
              'organization/listContacts'
            )

            await setJsonData(elasticacheKey, { stage: 'Populating account', status: 'working' })   
            // Send the profile to elasticache
            await orgSignIn(
              orgData.profile,
              orgData.organization,
              locationRes.data.locations,
              contactRes.data.contacts
            )

            for (const contact of contactRes.data.contacts) {
              const options = { contactId: contact.id }
              const linkLocationsRes = await apiCall(
                {
                  authToken: orgData.authToken,
                  options: options
                },
                'location/list'
              )

              const locationIDs = []
              linkLocationsRes.data.locations.forEach(function (location) {
                locationIDs.push(location.id)
              })

              await addLinkedLocations(
                orgData.organization.id,
                contact.id,
                locationIDs
              )
            }
            await setJsonData(elasticacheKey, { stage: 'Populating account', status: 'complete' })

          return h.response({ status: 200 })
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
