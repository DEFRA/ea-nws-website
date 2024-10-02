const responseCodes = require('../../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getEmailStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { email } = req.payload as { email: string }
  // 200 Success
  if (authToken !== 'WrongAuthToken' && email !== 'invalid@email.com') {
    if (email === 'duplicate@email.com') {
      console.log('duplicate email, responding 500')
      return res.response(responseCodes.DUPLICATE_EMAIL).code(500)
    }
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

async function getEmailValidate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { email } = req.payload as { email: string }
  const { code } = req.payload as { code: string }
  const profile = {
    id: '1',
    enabled: true,
    firstname: 'John',
    lastname: 'Smith',
    emails: [
      'updated.matthew.pepper@gmail.com',
      'perry.pepper@gmail.com',
      email
    ],
    mobilePhones: ['07343454590', '07889668367'],
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
  if (authToken !== 'WrongAuthToken' && code != '999999') {
    return {
      profile: profile
    }
  } else {
    return res.response(responseCodes.INVALID_CODE).code(500)
  }
}

module.exports = { getEmailStart, getEmailValidate }
