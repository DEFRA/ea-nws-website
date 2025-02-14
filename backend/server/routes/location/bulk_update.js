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
            console.log('1')
            const response = await apiCall(
              { authToken: authToken, location: locations[i] },
              'location/update'
            )
            console.log("responseStatus@", response.status)
            if (response.status === 200) {
              await updateLocation(orgId, response.data.location)
              console.log('A')
              updatedLocations.push(response.data.location)              
              console.log('B')
            } else {
              console.log('C')
              updatedLocations.push(null)  
            }
            console.log('D')
          }    
          console.log('updated', updatedLocations)
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
