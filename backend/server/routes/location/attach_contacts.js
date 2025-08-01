const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { addLinkedContacts, getJsonData } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/location/attach_contacts',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, locationId, contactIds } = request.payload
        const { redis } = request.server.app
        const sessionData = await getJsonData(redis, authToken)

        if (authToken && sessionData.orgId && locationId && contactIds) {
          // get the whole location object to attach contacts to linked areas
          const key = sessionData.orgId + ':t_POIS:' + locationId
          const location = await getJsonData(redis, key)
          if (location) {
            const childrenIds = JSON.parse(
              location.additionals.filter(
                (additional) => additional?.id === 'other'
              )[0]?.value?.s
            )?.childrenIDs?.map((child) => child?.id)
            if (childrenIds && childrenIds.length > 0) {
              // loop through all child locations, we don't handle the response so this can be done
              // in the background asynchronously so no need to await
              for (const childrenId of childrenIds) {
                apiCall(
                  {
                    authToken: authToken,
                    locationId: childrenId,
                    contactIds: contactIds
                  },
                  'location/attachContacts'
                )
              }
            }
          }

          const response = await apiCall(
            {
              authToken: authToken,
              locationId: locationId,
              contactIds: contactIds
            },
            'location/attachContacts'
          )

          if (response.status === 200) {
            await addLinkedContacts(
              redis,
              sessionData.orgId,
              locationId,
              contactIds
            )
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
