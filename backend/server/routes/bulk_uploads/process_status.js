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

const DUPLICATE = 'duplicate'

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
              // Check invalid locations for duplicates
              result.data.invalid.forEach(async (location) => {
                if (await isDuplicate(authToken, location.Location_name)) {
                  // An invalid location should already have at least one error
                  // but do not assume this is the case
                  if (Array.isArray(error)) {
                    location.error.push(DUPLICATE)
                  } else {
                    location.error = [DUPLICATE]
                  }
                }
              })
              // Now check valid locations and move any duplicates
              // to invalid locations and mark as duplicates. Note that
              // we don't use forEach in this case because we could be
              // removing elements from valid locations.
              for (let i = 0; i < result.data.valid.length; i++) {
                const location = result.data.valid[i]
                if (await isDuplicate(authToken, location.Location_name)) {
                  result.data.valid.splice(i, 1)
                  // It seems reasonable to assume that a valid location
                  // will have no existing errors at this stage
                  location.error = [DUPLICATE]
                  result.data.invalid.push(location)
                  --i
                }
              }
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
