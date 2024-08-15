const responseCodes = require('../../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getHomephoneStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { msisdn } = req.payload as { msisdn: string }

  if (authToken === 'MockAuthToken') {
    if (msisdn === '+441000000000') {
      console.log('duplicate phone, responding 500')
      return res.response(responseCodes.DUPLICATE_PHONE).code(500)
    }
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
  console.log('Received LandlineValidate request: ', req.payload)
  console.log(msisdn)
  const profile = {
    id: '1',
    enabled: true,
    firstname: 'John',
    lastname: 'Smith',
    emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
    mobilePhones: ['07343454590', '07889668367'],
    homePhones: ['01475721555', msisdn],
    language: 'EN',
    additionals: [],
    unverified: {
      emails: [],
      mobilePhones: [],
      homePhones: []
    },
    pois: [
      {
        name: 'Royal Mail, Great Yarmouth Delivery Office, 6, North Quay, Great Yarmouth,  NR30 1AA',
        address: '10023463293',
        coordinates: {
          latitude: '52612444.5',
          longitude: '1724640.5'
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
module.exports = { getHomephoneStart, getHomephoneValidate }
