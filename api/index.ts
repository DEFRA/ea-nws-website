import Hapi from '@hapi/hapi'
import OpenAPIBackend from 'openapi-backend'

const server = new Hapi.Server({ port: 9001 })

// calling handlers
const signInHandlers = require('./handlers/signin/signInHandlers')
const registerHandlers = require('./handlers/signup/registerHandlers')
const mobileAuthenticationHandler = require('./handlers/signup/channel-preferences/mobile/mobileAuthenticationHandlers')
const updateProfileHandler = require('./handlers/updateProfile/updateProfileHandler')

// define api
const api = new OpenAPIBackend({
  definition: './openapi/index.yaml',
  handlers: {
    //sign up routes
    getRegisterStart: registerHandlers.getRegisterStart,
    getRegisterValidate: registerHandlers.getRegisterValidate,
    //mobile authentication
    getMobileStart: mobileAuthenticationHandler.getMobileStart,
    getMobileValidate: mobileAuthenticationHandler.getMobileValidate,

    //sign in routes
    getSignInStart: signInHandlers.getSigninStart,
    getSignInValidate: signInHandlers.getSigninValidate,
    getUpdateProfile: updateProfileHandler.getUpdateProfile
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
