const responseCodes = require('../responseCodes')

async function getSigninStart(context, req) {
  console.log('Received SignInStart request for: ', req.payload)
  if (req.payload.email === 'invalid@email.com') {
    console.log('Unknown email, responding 106')
    return responseCodes.UNKNOWN_EMAIL
  }
  console.log('Valid email, responding 200')
  return { ...responseCodes.SUCCESS, signinToken: '123456' }
}

async function getSigninValidate(context, req) {
  console.log(
    'Received SignInValidate request -- \n Code: ',
    req.payload.code,
    ' - SignInToken: ',
    req.payload.signinToken
  )
  if (req.payload.code === '999999' || req.payload.signinToken === undefined) {
    console.log('Invalid token')
    return responseCodes.INVALID_TOKEN
  }
  console.log('Valid token')
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
  const registration = {
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
    authToken: 'MockGUIDAuthToken',
    profile: profile,
    registration: registration
  }
}
module.exports = { getSigninStart, getSigninValidate }
