const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const {
  getJsonData,
  addInvLocation,
  addLocation
} = require('../../services/elasticache')
const {
  convertToPois
} = require('../../services/bulk_uploads/processLocations')
const crypto = require('node:crypto')
const { apiCall } = require('../../services/ApiService')

function uuidv4 () {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  )
}

module.exports = [
  {
    method: ['POST'],
    path: '/api/bulk_uploads/save_locations',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { authToken, orgId, fileName } = request.payload

        if (fileName && orgId && authToken) {
          const elasticacheKey = 'bulk_upload:' + fileName.split('.')[0]
          const result = await getJsonData(elasticacheKey)
          const valid = convertToPois(result.data.valid)
          const invalid = convertToPois(result.data.invalid)
          // Add all valid to geosafe and elasticache
          valid.forEach(async (location) => {
            const response = await apiCall(
              { authToken: authToken, location: location },
              'location/create'
            )
            if (response.data.location) {
              location.id = response.data.location.id
            } else {
              return createGenericErrorResponse(h)
            }
            await addLocation(orgId, location)
          })
          // Add invalid just to elasticache
          invalid.forEach(async (location) => {
            location.id = uuidv4()
            await addInvLocation(orgId, location)
          })

          const invalidReasons = {
            duplicate: invalid.filter((location) =>
              location.error?.includes('duplicate')
            ).length,
            notInEngland: invalid.filter((location) =>
              location.error?.includes('not in england')
            ).length,
            notFound: invalid.filter((location) =>
              location.error?.includes('not found')
            ).length
          }

          return h.response({
            status: 200,
            data: { valid: valid.length, invalid: invalidReasons }
          })
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        return createGenericErrorResponse(h)
      }
    }
  }
]
