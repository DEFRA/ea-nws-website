const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { removeLinkedContacts, getJsonData } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/location/detach_contacts',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, orgId, locationId, contactIds } = request.payload

        if (authToken && orgId && locationId && contactIds) {
          // get the whole location object to detach contacts to linked areas
          const key = orgId + ':t_POIS:' + locationId
          const location = await getJsonData(key)
          if (location) {
            const childrenIds = JSON.parse(location.additionals.filter((additional) => additional?.id === 'other')[0]?.value?.s)?.childrenIDs?.map((child) => child?.id)
            if (childrenIds && childrenIds.length > 0) {
              for (const childrenId of childrenIds) {
                await apiCall(
                  { authToken: authToken, locationId: childrenId, contactIds: contactIds },
                  'location/detachContacts'
                )
              }
            }
          }
          const response = await apiCall(
            { authToken: authToken, locationId: locationId, contactIds: contactIds },
            'location/detachContacts'
          )

          if (response.status === 200) {
            await removeLinkedContacts(orgId, locationId, contactIds)
            return h.response({ status: 200 })
          } else {
            return createGenericErrorResponse(h)
          }
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
