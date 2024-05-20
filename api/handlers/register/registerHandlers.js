async function getRegisterStart (context, req) {
  console.log('Received register start request for: ', req.payload)
  if (req.payload.email === 'emailAlreadyInUse@email.com') {
    console.log('Email already in Use, responding 101')
    return { code: 101, desc: 'Email already in Use' }
  }
  console.log('Valid email, responding 200')
  return { code: 200, registerToken: '123456' }
}

async function getRegisterValidate (context, req) {
  console.log('Received register request -- \n Code: ', req.payload.code, ' - RegisterToken: ', req.payload.registerToken)
  if (req.payload.code === '999999') {
    console.log('Invalid token')
    return { code: 101, desc: 'InvalidToken' }
  }
  console.log('Valid token')

  return { authToken: 'MockGUIDAuthToken' }
};

module.exports = { getRegisterStart, getRegisterValidate }
