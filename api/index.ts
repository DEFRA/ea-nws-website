import Hapi from '@hapi/hapi'
import OpenAPIBackend from 'openapi-backend'

const server = new Hapi.Server({ port: 9000 })

// calling handlers
const signInHandlers = require('./handlers/signin/signinHandlers')
const registerHandlers = require('./handlers/signup/registerHandlers')
const updateProfileHandler = require('./handlers/updateProfile/updateProfileHandler')
const mobileAuthenticationHandler = require('./handlers/contact_methods/mobile/mobileAuthenticationHandlers')
const homePhoneAuthenticationHandlers = require('./handlers/contact_methods/homephone/homephoneAuthenticationHandlers')
const emailAuthenticationHandlers = require('./handlers/contact_methods/email/emailAuthenticationHandlers')
const partnerHandler = require('./handlers/partner/partnerHandlers')
const deleteAccountHandler = require('./handlers/account/deleteAccountHandler')
const orgContactsHandlers = require('./handlers/organisation/contactsHandlers')
const orgRemoveHandler = require('./handlers/organisation/orgRemoveHandler')
const orgUpdateHandler = require ('./handlers/organisation/orgUpdateHandler')
const orgInvitationHandler = require('./handlers/organisation/orgInvitationHandler')
// define api
const api = new OpenAPIBackend({
  definition: './openapi/openapi.yml',
  quick: true,
  handlers: {
    //sign up routes
    getRegisterStart: registerHandlers.getRegisterStart,
    getOrgRegisterStart: registerHandlers.getOrgRegisterStart,
    getRegisterValidate: registerHandlers.getRegisterValidate,
    getOrgRegisterValidate: registerHandlers.getOrgRegisterValidate,
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
    getRegisterToPartner: partnerHandler.getRegisterToPartner,
    getUnregisterFromPartner: partnerHandler.getUnregisterFromPartner,
    getUpdateRegistration: partnerHandler.getUpdateRegistration,
    getOrgListRegistrations: partnerHandler.getOrgListRegistrations,
    //account deletion
    getDeleteAccount: deleteAccountHandler.getDeleteAccount,
    // Org Specific Routes
    // Contacts routes
    getOrgCreateContacts: orgContactsHandlers.getOrgCreateContacts,
    getOrgDemoteContact: orgContactsHandlers.getOrgDemoteContact,
    getOrgListContacts: orgContactsHandlers.getOrgListContacts,
    getOrgRemoveContacts: orgContactsHandlers.getOrgRemoveContacts,
    getOrgPromoteContact: orgContactsHandlers.etOrgPromoteContact,
    getOrgUpdateContact: orgContactsHandlers.getOrgUpdateContact,
    //remove org
    getOrgRemove: orgRemoveHandler.getOrgRemove,
    //update org
    getOrgUpdate: orgUpdateHandler.getOrgUpdate,
    // org invitation
    getOrgValidateInvitation: orgInvitationHandler.getOrgValidateInvitation
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
