const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const {
  getJsonData,
  addInvLocation,
  addLocations,
  setJsonData
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
        const { redis } = request.server.app

        if (fileName && orgId && authToken) {
          const statusKey = 'bulk_save_status:' + authToken
          await setJsonData(redis, statusKey, { stage: 'Adding locations', status: 'working' })
          const elasticacheKey = 'bulk_upload:' + fileName.split('.')[0]
          const result = await getJsonData(redis, elasticacheKey)
          const valid = convertToPois(result.data.valid)
          const invalid = convertToPois(result.data.invalid)
          const { data: partnerId } = await getPartnerId()
          // split the locations into groups of 25
          const validLength = valid.length
          for (let i = 0; i < valid.length; i += 25) {
            setJsonData(redis, statusKey, { stage: `Adding locations (${Math.round((i/validLength)*100)}%)`, status: 'working' })
            const chunk = valid.slice(i, i + 25)
            const geosafeLocations = []
            // Add all valid to geosafe and elasticache
            await Promise.all(chunk.map(async (location) => {
              
              const response = await apiCall(
                { authToken: authToken, location: location },
                'location/create'
              )
              if (response.data.location) {
                // Register locations
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
                // add to array of geosafe locations
                geosafeLocations.push(response.data.location)
              } else {
                return createGenericErrorResponse(h)
              }
            }))

            await addLocations(redis, orgId, geosafeLocations)
          }

          const invalidLength = invalid.length
          for (let i = 0; i < invalid.length; i += 25) {
            setJsonData(redis, statusKey, { stage: `storing locations (${Math.round((i/invalidLength)*100)}%)`, status: 'working' })
            const chunk = invalid.slice(i, i + 25)
            // Add invalid just to elasticache
            await Promise.all(
              chunk.map(async (location) => {
                location.id = uuidv4()
                await addInvLocation(redis, orgId, location)
              })
            )
          }
          

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

          setJsonData(redis, statusKey, { stage: `storing locations`, status: 'complete', data: { valid: valid.length, invalid: invalidReasons }})
          return h.response({
            status: 200
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
