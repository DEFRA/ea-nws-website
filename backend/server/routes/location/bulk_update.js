const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { updateLocation } = require('../../services/elasticache')

module.exports = [
  {
    method: ['POST'],
    path: '/api/location/bulk_update',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, orgId, locations } = request.payload
        if (authToken && locations && orgId) {
          const updatedLocations = []
          for(let i = 0; i < locations.length; i++){
            const response = await apiCall(
              { authToken: authToken, location: locations[i] },
              'location/update'
            )
            console.log("responseStatus@", response.status)
            if (response.status === 200) {
              await updateLocation(orgId, response.data.location)
              updatedLocations.push(response.data.location)
            } else {
              updatedLocations.push(null)  
            }
          }    
          return h.response({ status: 200, data: updatedLocations })      
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
