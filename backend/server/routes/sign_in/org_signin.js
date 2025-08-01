const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const {
  orgSignIn,
  addLinkedLocations,
  setJsonData,
  getJsonData
} = require('../../services/elasticache')
const { logger } = require('../../plugins/logging')

// geosafe api restricted to 1024 locations per response
// recall to api required to collect all locations
const getAdditionalLocations = async (
  firstLocationApiCall,
  authToken,
  contactId = null
) => {
  let additionalLocations = []

  if (firstLocationApiCall.data.total > 1000) {
    const fetchLocationsPromises = []
    const totalRecalls = Math.floor(firstLocationApiCall.data.total / 1000)
    let i = 1
    while (i <= totalRecalls) {
      let options = {
        offset: 1000 * i,
        limit: 1000,
        sort: [{
          fieldName: 'id',
          order: 'ASCENDING'
        }]
      }
      if (contactId) options.contactId = contactId
      fetchLocationsPromises.push(
        apiCall(
          {
            authToken: authToken,
            options: options
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
        const sessionData = await getJsonData(redis, orgData?.authToken)

        if (orgData && sessionData) {
          const elasticacheKey = 'signin_status:' + orgData.authToken
          await setJsonData(redis, elasticacheKey, {
            stage: 'Retrieving locations',
            status: 'working'
          })

          let locations = []
          let options = {
            limit: 1000,
            sort: [{
              fieldName: 'id',
              order: 'ASCENDING'
            }]
          }
          const locationRes = await apiCall(
            { authToken: orgData.authToken, options: options },
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
            sessionData.orgId,
            orgData.authToken
          )

          const numContacts = contactRes.data.contacts.length
          let contactIndex = 1

          for (const contact of contactRes.data.contacts) {
            let contactsLocations = []
            const options = {
              contactId: contact.id,
              limit: 1000,
              sort: [{
                fieldName: 'id',
                order: 'ASCENDING'
              }]
            }
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
              orgData.authToken,
              contact.id
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

            await setJsonData(redis, elasticacheKey, {
              stage: 'Processing Contacts',
              status: 'working',
              percent: (contactIndex/numContacts)*100
            })
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
