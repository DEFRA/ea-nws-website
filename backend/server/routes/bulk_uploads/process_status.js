const { searchLocations } = require('../../services/elasticache')

const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { getJsonData } = require('../../services/elasticache')

const isDuplicate = async (authToken, locationName) => {
  const locationArr = await searchLocations(
    authToken,
    'meta_data.location_additional.location_name',
    locationName
  )
  return locationArr.length !== 0
}

module.exports = [
  {
    method: ['POST'],
    path: '/api/bulk_uploads/process_status',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { authToken, fileName } = request.payload

        if (fileName) {
          const elasticacheKey = 'bulk_upload:' + fileName.split('.')[0]

          const result = await getJsonData(elasticacheKey)
          if (result) {
            if (result.data) {
              console.log('BEFORE result.data', result.data)

              for (let i = 0; i < result.data.valid.length; i++) {
                const location = result.data.valid[i]
                if (await isDuplicate(location.Location_name)) {
                  result.data.valid.splice(i, 1)
                  location.error = 'duplicate'
                  result.data.invalid.push(location)
                }
              }

              console.log('AFTER result.data', result.data)
            }
            return h.response({ status: 200, data: result })
          } else {
            return h.response({ status: 200 })
          }
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
