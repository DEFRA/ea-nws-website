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
const { searchLocations } = require('../../services/elasticache')

function uuidv4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  )
}

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
    path: '/api/bulk_uploads/save_locations',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { authToken, fileName } = request.payload

        if (fileName && authToken) {
          const elasticacheKey = 'bulk_upload:' + fileName.split('.')[0]
          const result = await getJsonData(elasticacheKey)
          const valid = convertToPois(result.data.valid)
          const invalid = convertToPois(result.data.invalid)
          // add unique location ID and add to elsaticache
          valid.forEach(async (location) => {
            const duplicate = await isDuplicate(
              authToken,
              location.meta_data.location_additional.location_name
            )
            if (duplicate) {
              await addInvLocation(authToken, {
                location: location,
                reason: 'duplicate'
              })
            } else {
              location.meta_data.location_id = uuidv4()
              await addLocation(authToken, location)
            }
          })
          invalid.forEach(async (location) => {
            location.meta_data.location_id = uuidv4()
            await addInvLocation(authToken, {
              location: location,
              reason: 'invalid'
            })
          })

          // TODO: call geosafe API to add locations to geosafe as well

          return h.response({
            status: 200,
            data: { valid: valid.length, invalid: invalid.length }
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
