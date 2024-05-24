const { Context } = require('openapi-backend')
const Hapi = require('@hapi/hapi')

async function getMobileStart(context, req, h) {
  return h.response({ message: 'Data is valid' }).code(200)

  // // 200 Success
  // if (req.payload.authToken === 'validAuthToken') {
  //   console.log('status', 200)
  //   const response = (context.res = {
  //     status: 200
  //   })
  //   return response
  // }

  // // 400 Bad Request - Invalid Auth Token
  // if (req.payload.authToken !== 'authToken') {
  //   console.log('status', 400)
  //   const response = (context.res = {
  //     status: 400,
  //     body: { code: 101, desc: 'invalid token' }
  //   })
  //   return response
  // }

  // // 404 Not Found - The Mobile Number Isn't Found
  // if (req.payload.msisdn === 'invalid') {
  //   console.log('status', 404)
  //   const response = (context.res = {
  //     status: 404
  //   })
  //   return response
  // }

  // // 500 Internal Server Error
  // if (req.payload.authToken === '500') {
  //   console.log('status', 500)
  //   const response = (context.res = {
  //     status: 500,
  //     body: { code: 101, desc: '500 internal server error' }
  //   })
  //   return response
  // }
  // return null
}

async function getMobileValidate(context, req) {
  console.log('request', req.payload)
  return { t: 'works' }
}

module.exports = { getMobileStart, getMobileValidate }
