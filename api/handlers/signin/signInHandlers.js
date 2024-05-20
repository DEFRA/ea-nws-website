async function getSigninStart(context, req) {
  console.log('Received SignInStart request for: ', req.payload)
  if (req.payload.email === 'invalid@email.com') {
    console.log('Invalid email, responding 500')
    return { code: 101, desc: 'unknown email' }
  }
  console.log('Valid email, responding 200')
  return { code: 200, signInToken: '123456' }
}

async function getSigninValidate(context, req) {
  console.log(
    'Received SignInValidate request -- \n Code: ',
    req.payload.code,
    ' - SignInToken: ',
    req.payload.signinToken
  )
  if (req.payload.code === '999999') {
    console.log('Invalid token')
    return { code: 101, desc: 'InvalidToken' }
  }
  console.log('Valid token')

  const profile = {
    id: '1',
    enabled: true,
    firstName: 'John',
    lastName: 'Smith',
    emails: ['matthew.pepper@gmail.com', 'perry.pepper@gmail.com'],
    mobilePhones: ['07343 454590', '07889 668367'],
    homePhones: ['01475 721535'],
    language: 'EN',
    additionals: [],
    unverified: {
      emails: [],
      mobilePhones: [],
      homePhones: [
        {
          address: '+336********'
        }
      ]
    },
    pois: [
      {
        address: 'Exeter, Royaume-Uni',
        coordinates: {
          latitude: 50726037,
          longitude: -3527489
        }
      }
    ]
  }

  const registration = { partner: '4', name: 'NWS England' }
  return {
    authToken: 'MockGUIDAuthToken',
    profile,
    registration
  }
}

module.exports = { getSigninStart, getSigninValidate }
