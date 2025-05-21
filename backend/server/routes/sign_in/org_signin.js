const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const {
  orgSignIn,
  addLinkedLocations,
  setJsonData
} = require('../../services/elasticache')
const { logger } = require('../../plugins/logging')

// geosafe api restricted to 1024 locations per response
// recall to api required to collect all locations
const getAdditionalLocations = async (firstLocationApiCall, authToken) => {
  let additionalLocations = []

  if (firstLocationApiCall.data.total > 1024) {
    const fetchLocationsPromises = []
    const totalRecalls = Math.floor(firstLocationApiCall.data.total / 1024)
    let i = 1
    while (i <= totalRecalls) {
      fetchLocationsPromises.push(
        apiCall(
          {
            authToken: authToken,
            options: { offset: 1024 * i }
          },
          'location/list'
        )
      )
      i++
    }

    const results = await Promise.all(fetchLocationsPromises)
    results.forEach((response) => {
      additionalLocations.push(...response.data.locations)
    })
  }

  return additionalLocations
}

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
        const { redis } = request.server.app

        if (orgData) {
          const elasticacheKey = 'signin_status:' + orgData.authToken
          await setJsonData(redis, elasticacheKey, {
            stage: 'Retrieving locations',
            status: 'working'
          })

          let locations = []
          const locationRes = await apiCall(
            { authToken: orgData.authToken },
            'location/list'
          )
          locations.push(...locationRes.data.locations)

          const additionalLocations = await getAdditionalLocations(
            locationRes,
            orgData.authToken
          )
          locations.push(...additionalLocations)

          await setJsonData(redis, elasticacheKey, {
            stage: 'Retrieving contacts',
            status: 'working'
          })
          const contactRes = await apiCall(
            { authToken: orgData.authToken },
            'organization/listContacts'
          )

          await setJsonData(redis, elasticacheKey, {
            stage: 'Populating account',
            status: 'working'
          })
          // Send the profile to elasticache
          await orgSignIn(
            redis,
            orgData.profile,
            orgData.organization,
            locations,
            contactRes.data.contacts,
            orgData.authToken
          )

          for (const contact of contactRes.data.contacts) {
            let contactsLocations = []
            const options = { contactId: contact.id }
            const linkLocationsRes = await apiCall(
              {
                authToken: orgData.authToken,
                options: options
              },
              'location/list'
            )
            contactsLocations.push(...linkLocationsRes.data.locations)

            const additionalLocations = await getAdditionalLocations(
              locationRes,
              orgData.authToken
            )
            contactsLocations.push(...additionalLocations)

            const locationIDs = []
            contactsLocations.forEach(function (location) {
              locationIDs.push(location.id)
            })

            await addLinkedLocations(
              redis,
              orgData.organization.id,
              contact.id,
              locationIDs
            )
          }
          await setJsonData(redis, elasticacheKey, {
            stage: 'Populating account',
            status: 'complete'
          })

          return h.response({ status: 200 })
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
