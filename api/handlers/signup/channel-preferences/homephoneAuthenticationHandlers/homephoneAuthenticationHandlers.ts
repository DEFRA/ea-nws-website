const responseCodes = require('../../../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getHomephoneStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  console.log('Received LandlineStart request: ', req.payload)
  const { authToken } = req.payload as { authToken: string }
  const { msisdn } = req.payload as { msisdn: string }

  if (authToken === 'MockGUIDAuthToken') {
    return res.response(responseCodes.SUCCESS)
  }
  return res.response(responseCodes.INVALID_TOKEN).code(500)
}

async function getHomephoneValidate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { msisdn } = req.payload as { msisdn: string }
  const { code } = req.payload as { code: string }

  // 200 Success
  if (code === '123456') {
    const profile = {
      id: '1',
      enabled: true,
      firstName: 'John',
      lastName: 'Smith',
      emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
      mobilePhones: ['07343454590', '07889668367'],
      homePhones: ['01475721535'],
      language: 'EN',
      additionals: [],
      unverified: {
        emails: [],
        mobilePhones: [],
        homePhones: ['01475721535']
      },
      pois: {
        address: 'Exeter, United Kingdom',
        coordinates: {
          latitude: '50726037',
          longitude: '-3527489'
        }
      }
    }

    return res.response(profile)
  }
  return res.response(responseCodes.INVALID_CODE).code(500)
}
module.exports = { getHomephoneStart, getHomephoneValidate }
