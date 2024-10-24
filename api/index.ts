import Hapi from '@hapi/hapi'
import OpenAPIBackend from 'openapi-backend'

const server = new Hapi.Server({ port: 9000 })

// calling handlers
const signInHandlers = require('./handlers/signin/signinHandlers')
const registerHandlers = require('./handlers/signup/registerHandlers')
const updateProfileHandler = require('./handlers/updateProfile/updateProfileHandler')
const mobileAuthenticationHandler = require('./handlers/contact/mobile/mobileAuthenticationHandlers')
const homePhoneAuthenticationHandlers = require('./handlers/contact/homephone/homephoneAuthenticationHandlers')
const emailAuthenticationHandlers = require('./handlers/contact/email/emailAuthenticationHandlers')
const registerToPartnerHandler = require('./handlers/partner/registerToPartnerHandler')
const deleteAccountHandler = require('./handlers/account/deleteAccountHandler')
// define api
const api = new OpenAPIBackend({
  definition: './openapi/openapi.yml',
  quick: true,
  handlers: {
    //sign up routes
    getRegisterStart: registerHandlers.getRegisterStart,
    getRegisterOrgStart: registerHandlers.getRegisterOrgStart,
    getRegisterValidate: registerHandlers.getRegisterValidate,
    //mobile authentication
    getMobileStart: mobileAuthenticationHandler.getMobileStart,
    getMobileValidate: mobileAuthenticationHandler.getMobileValidate,
    //email authentication
    getEmailStart: emailAuthenticationHandlers.getEmailStart,
    getEmailValidate: emailAuthenticationHandlers.getEmailValidate,
    //homephone authentication
    getHomephoneStart: homePhoneAuthenticationHandlers.getHomephoneStart,
    getHomephoneValidate: homePhoneAuthenticationHandlers.getHomephoneValidate,
    //sign in routes
    getSignInStart: signInHandlers.getSigninStart,
    getSignInValidate: signInHandlers.getSigninValidate,
    //update profile routes
    getUpdateProfile: updateProfileHandler.getUpdateProfile,
    //partner routes
    getRegisterToPartner: registerToPartnerHandler.getRegisterToPartner,
    //account deletion
    getDeleteAccount: deleteAccountHandler.getDeleteAccount
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
