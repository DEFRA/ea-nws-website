import Hapi from '@hapi/hapi'
import OpenAPIBackend from 'openapi-backend'

const server = new Hapi.Server({ port: 9000 })

// calling handlers
const signInHandlers = require('./handlers/signin/signinHandlers')
const registerHandlers = require('./handlers/signup/registerHandlers')
const updateProfileHandler = require('./handlers/updateProfile/updateProfileHandler')
const homePhoneAuthenticationHandlers = require('./handlers/signup/channel-preferences/homephoneAuthenticationHandlers/homephoneAuthenticationHandlers')

// define api
const api = new OpenAPIBackend({
  definition: './openapi/index.yaml',
  handlers: {
    getRegisterStart: registerHandlers.getRegisterStart,
    getRegisterValidate: registerHandlers.getRegisterValidate,
    getSignInStart: signInHandlers.getSigninStart,
    getSignInValidate: signInHandlers.getSigninValidate,
    getUpdateProfile: updateProfileHandler.getUpdateProfile,
    getHomephoneStart: homePhoneAuthenticationHandlers.getHomephoneStart,
    getHomephoneValidate: homePhoneAuthenticationHandlers.getHomephoneValidate
  }
})

api.init()

// use as a catch-all handler
server.route({
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  path: '/{path*}',
  handler: (req, h) =>
    api.handleRequest(
      {
        method: req.method,
        path: req.path,
        body: req.payload,
        query: req.query,
        headers: req.headers
      },
      req,
      h
    )
})

// start server
server.start().then(() => console.info(`listening on ${server.info.uri}`))
