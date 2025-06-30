const { logger } = require('../../plugins/logging')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')

const { getTAData, setTAData } = require('../../services/elasticache')
const { getFloodAreaByTaCode } = require('../../services/qgis/qgisFunctions')

module.exports = [
  {
    method: ['POST'],
    path: '/api/elasticache/get_ta_data',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
        const { TA_CODE } = request.payload
        const { redis } = request.server.app

        if (TA_CODE) {
          let result
          console.log('getting TA')
          result = await getTAData(redis, TA_CODE)
          console.log(result)
          if (result === null) {
            console.log('finding in qgis')
            result = await getFloodAreaByTaCode(TA_CODE)
            await setTAData(redis, TA_CODE, result)
          }
          if (result) {
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
