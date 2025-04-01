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
const { logger } = require('../../plugins/logging')
const { getPartnerId } = require('../../services/GetPartnerId')

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
          await Promise.all(valid.map(async (location) => {
            const response = await apiCall(
              { authToken: authToken, location: location },
              'location/create'
            )
            if (response.data.location) {
              // Register locations
              const { data: partnerId } = await getPartnerId()
              const registerData = {
                authToken,
                locationId: response.data.location.id,
                partnerId,
                params: {
                  channelVoiceEnabled: true,
                  channelSmsEnabled: true,
                  channelEmailEnabled: true,
                  channelMobileAppEnabled: true,
                  partnerCanView: true,
                  partnerCanEdit: true,
                  alertTypes: JSON.parse(location?.additionals?.filter((additional) => additional.id === 'other')[0]?.value?.s)?.alertTypes || []
                }
              }

              await apiCall(
                registerData,
                'location/registerToPartner'
              )
              // add to elasticache
              await addLocation(orgId, response.data.location)
            } else {
              return createGenericErrorResponse(h)
            }
          }))

          // Add invalid just to elasticache
          await Promise.all(invalid.map(async (location) => {
            location.id = uuidv4()
            await addInvLocation(orgId, location)
          }))

          const invalidReasons = {
            duplicate: invalid.filter((location) =>
              location.error?.includes('duplicate')
            ).length,
            notInEngland: invalid.filter((location) =>
              location.error?.includes('not in England')
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
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
