const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const {
  findLocationByName,
  getJsonData,
  setJsonData
} = require('../../services/elasticache')

const isDuplicate = async (orgId, locationName) => {
  const locationArr = await findLocationByName(orgId, locationName)
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
        const { orgId, fileName } = request.payload

        if (fileName) {
          const elasticacheKey = 'shapefile:' + fileName.split('.')[0]

          const result = await getJsonData(elasticacheKey)
          if (result) {
            if (result.data) {
              // Check invalid locations for duplicates
              const locationName = result.data.properties?.name ||
              result.data.properties?.lrf15nm ||
              result.data.properties.fileName
              if (await isDuplicate(orgId, locationName)) {
                // An invalid location should already have at least one error
                // but do not assume this is the case
                if (Array.isArray(result.data.properties.error)) {
                  result.data.properties.error.push(DUPLICATE)
                } else {
                  result.data.properties.error = [DUPLICATE]
                }
              }

              // Write any changes back to elasticache
              await setJsonData(elasticacheKey, result)
            }
            return h.response({ status: 200, data: result })
          } else {
            return h.response({ status: 200 })
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
