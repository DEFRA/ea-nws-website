const responseCodes = require('../../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getMobileStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { msisdn } = req.payload as { msisdn: string }
  console.log(msisdn)
  // 200 Success
  if (authToken === 'MockAuthToken') {
    if (msisdn === '+447000000000') {
      console.log('duplicate mobile, responding 500')
      return res.response(responseCodes.DUPLICATE_MOBILE).code(500)
    }
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getMobileValidate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { msisdn } = req.payload as { msisdn: string }
  const { code } = req.payload as { code: string }
  const profile = {
    id: '1',
    enabled: true,
    firstname: '',
    lastname: '',
    emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
    mobilePhones: ['07343454555', '07889668355', msisdn],
    homePhones: ['01475721535'],
    language: 'EN',
    additionals: [],
    unverified: {
      emails: [],
      mobilePhones: [],
      homePhones: []
    },
    pois: [
      {
        address: 'Exeter, United Kingdom',
        coordinates: {
          latitude: '50726037',
          longitude: '-3527489'
        }
      }
    ]
  }

  if(code === '111111'){
    console.log("invalid credentials, responding 101")
    return res.response(responseCodes.UNAUTHORIZED).code(500)
  }
  // 200 Success
  if (authToken === 'MockAuthToken' && code !== '999999') {
    return {
      profile: profile
    }
  } else {
    return res.response(responseCodes.INVALID_CODE).code(500)
  }
}

module.exports = { getMobileStart, getMobileValidate }
