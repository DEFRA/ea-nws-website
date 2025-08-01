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
const orgUpdateHandler = require('./handlers/organisation/orgUpdateHandler')
const orgInvitationHandler = require('./handlers/organisation/orgInvitationHandler')
const locationContactsHandlers = require('./handlers/location/locationContactsHandlers')
const locationHandlers = require('./handlers/location/locationHandlers')
const locationPartnerHandlers = require('./handlers/location/locationPartnerHandlers')
const liveAlertsHandlers = require('./handlers/live_alerts/liveAlertsHandlers')
const memberLocationPartnerHandlers = require('./handlers/member_register_location_to_partner/memberLocationPartnerHandlers')
// define api
const api = new OpenAPIBackend({
  definition: './openapi/openapi.yml',
  quick: true,
  validate: false,
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
    //register location to partner
    getRegisterLocationToPartner:
      memberLocationPartnerHandlers.getRegisterLocationToPartner,
    getUnregisterLocationFromPartner:
      memberLocationPartnerHandlers.getUnregisterLocationFromPartner,
    getUpdateLocationRegistration:
      memberLocationPartnerHandlers.getUpdateLocationRegistration,
    //account deletion
    getDeleteAccount: deleteAccountHandler.getDeleteAccount,
    // Org Specific Routes
    // Contacts routes
    getOrgCreateContacts: orgContactsHandlers.getOrgCreateContacts,
    getOrgDemoteContact: orgContactsHandlers.getOrgDemoteContact,
    getOrgListContacts: orgContactsHandlers.getOrgListContacts,
    getOrgRemoveContacts: orgContactsHandlers.getOrgRemoveContacts,
    getOrgPromoteContact: orgContactsHandlers.getOrgPromoteContact,
    getOrgUpdateContact: orgContactsHandlers.getOrgUpdateContact,
    //remove org
    getOrgRemove: orgRemoveHandler.getOrgRemove,
    //update org
    getOrgUpdate: orgUpdateHandler.getOrgUpdate,
    // org invitation
    getOrgValidateInvitation: orgInvitationHandler.getOrgValidateInvitation,
    // Location routes
    // Location contacts
    getLocationAttachContacts:
      locationContactsHandlers.getLocationAttachContacts,
    getLocationDetachContacts:
      locationContactsHandlers.getLocationDetachContacts,
    // Location
    getLocationCreate: locationHandlers.getLocationCreate,
    getLocationList: locationHandlers.getLocationList,
    getLocationRemove: locationHandlers.getLocationRemove,
    getLocationUpdate: locationHandlers.getLocationUpdate,
    // Location Partner
    getLocationListRegistrations:
      locationPartnerHandlers.getLocationListRegistrations,
    getLocationRegisterToPartner:
      locationPartnerHandlers.getLocationRegisterToPartner,
    getLocationUnregisterFromPartner:
      locationPartnerHandlers.getLocationUnregisterFromPartner,
    getLocationUpdateRegistration:
      locationPartnerHandlers.getLocationUpdateRegistration,
    // live alerts
    getAlertsList: liveAlertsHandlers.getAlertsList,
    getAlert: liveAlertsHandlers.getAlert
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
