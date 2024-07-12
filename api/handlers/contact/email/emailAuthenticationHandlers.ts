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
  if (authToken === 'MockAuthToken' && email !== 'invalid@email.com') {
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
    firstName: 'John',
    lastName: 'Smith',
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
        address: 'Exeter, United Kingdom',
        coordinates: {
          latitude: '50726037',
          longitude: '-3527489'
        }
      },
      {
        address: 'Exmouth, United Kingdom',
        coordinates: {
          latitude: '50726037',
          longitude: '-3527489'
        }
      }
    ]
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

module.exports = { getEmailStart, getEmailValidate }
