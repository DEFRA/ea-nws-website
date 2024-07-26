const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getSigninStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  console.log('Received SignInStart request for: ', req.payload)
  const { email } = req.payload as { email: string }
  if (email === 'invalid@email.com') {
    return res.response(responseCodes.UNKNOWN_EMAIL).code(500)
  }
  console.log('Valid email, responding 200')
  return { signinToken: '123456' }
}

async function getSigninValidate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  console.log('Received SignInValidate request: ', req.payload)
  const { code, signinToken } = req.payload as {
    code: string
    signinToken: string
  }
  if (code === '999999' || signinToken === undefined) {
    console.log('Invalid token')
    return res.response(responseCodes.INVALID_CODE).code(500)
  }
  console.log('Valid token')
  const profile = {
    id: '1',
    enabled: true,
    firstname: '',
    lastname: '',
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
          latitude: '50621091',
          longitude: '-3412665'
        }
      }
    ]
  }
  const registrations = {
    partner: {
      id: '4',
      name: 'NWS England',
      description: 'We work to create better places for people and...',
      longName: 'Environment Agency - England',
      logoUrl: 'logo.png',
      backgroundUrl: 'http://assets.gov.uk',
      urlSlug: 'england'
    },
    registrationDate: '1683741990',
    params: {
      channelVoiceEnabled: true,
      channelSmsEnabled: true,
      channelEmailEnabled: true,
      partnerCanView: false,
      partnerCanEdit: false,
      categories: [
        {
          domain: 'NFWS',
          code: 'FLOOD_ALERT'
        },
        {
          domain: 'NFWS',
          code: 'FLOOD_WARNING'
        },
        {
          domain: 'NFWS',
          code: 'SEVERE_FLOOD_WARNING'
        }
      ]
    }
  }
  return {
    authToken: 'MockAuthToken',
    profile: profile,
    registrations: registrations
  }
}
module.exports = { getSigninStart, getSigninValidate }
