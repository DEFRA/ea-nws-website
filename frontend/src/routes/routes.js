import React from 'react'
import Index from '../pages/Index'
import AccountPage from '../pages/account/AccountPage'
import ChangeBusinessDetailsPage from '../pages/account/ChangeBusinessDetailsPage'
import ChangeEmailPage from '../pages/account/ChangeEmailPage'
import ChangeEmailValidationPage from '../pages/account/ChangeEmailValidatePage'
import ChangeNamePage from '../pages/account/ChangeNamePage'
import ConfirmDeleteContactDetailsPage from '../pages/contact-details/ConfirmDeleteContactDetailsPage'
import ContactDetailsPage from '../pages/contact-details/ContactDetailsPage'
import AddEmailPage from '../pages/contact-details/add-contact-email/AddEmailPage'
import AddEmailValidatePage from '../pages/contact-details/add-contact-email/AddEmailValidatePage'
import AddLandlinePage from '../pages/contact-details/add-contact-landline/AddLandlinePage'
import AddLandlineValidatePage from '../pages/contact-details/add-contact-landline/AddLandlineValidatePage'
import AddMobilePage from '../pages/contact-details/add-contact-mobile/AddMobilePage'
import AddMobileValidatePage from '../pages/contact-details/add-contact-mobile/AddMobileValidatePage'
import AccessibilityStatementPage from '../pages/footer/AccessibilityStatementPage'
import ContactUsPage from '../pages/footer/ContactUsPage'
import CookiesPage from '../pages/footer/CookiesPage'
import PrivacyNoticePage from '../pages/footer/PrivacyNoticePage'
import TermsAndConditionsPage from '../pages/footer/TermsAndConditionsPage'
import HomePage from '../pages/home/HomePage'
import SignOutManuallyPage from '../pages/sign-out/SignOutManuallyPage'
import SignBackInPage from '../pages/sign-out/signBackInPage'
import SignOutAutomaticallyPage from '../pages/sign-out/signOutAutomaticallyPage'
import SignInPage from '../pages/signIn/SignInStartPage'
import SignInValidatePage from '../pages/signIn/SignInValidatePage'
import AddFullNamePage from '../pages/signup/account-name/AddFullNamePage'
import SignUpDuplicateEmailPage from '../pages/signup/account/SignUpDuplicateEmail'
import SignUpFeedbackPage from '../pages/signup/account/SignUpFeedbackPage'
import SignUpPage from '../pages/signup/account/SignUpPage'
import SignUpValidationPage from '../pages/signup/account/SignUpValidationPage'
import WarningContactsPreferencePage from '../pages/signup/channel-preferences/WarningContactsPreferencePage'
import AddLandlinePhonePage from '../pages/signup/channel-preferences/landline-telephone-authentication/AddLandlinePhonePage'
import SkipConfirmLandlinePhonePage from '../pages/signup/channel-preferences/landline-telephone-authentication/SkipConfirmLandlinePhonePage'
import ValidateLandlinePhonePage from '../pages/signup/channel-preferences/landline-telephone-authentication/ValidateLandlinePhonePage'
import AddMobilePhonePage from '../pages/signup/channel-preferences/mobile-telephone-authentication/AddMobilePhonePage'
import SkipConfirmMobilePhonePage from '../pages/signup/channel-preferences/mobile-telephone-authentication/SkipConfirmMobilePhonePage'
import ValidateMobilePhonePage from '../pages/signup/channel-preferences/mobile-telephone-authentication/ValidateMobilePhonePage'
import LocationInAlertAreaPage from '../pages/signup/register-location/LocationInAlertAreaPage'
import LocationInSevereWarningAreaPage from '../pages/signup/register-location/LocationInSevereWarningAreaPage'
import LocationNotNearDangerPage from '../pages/signup/register-location/LocationNotNearDangerPage'
import LocationSearchPage from '../pages/signup/register-location/LocationSearchPage'
import LocationSearchResultsPage from '../pages/signup/register-location/LocationSearchResultsPage'
import DeclarationOfAgreementPage from '../pages/signup/user-agreement/DeclarationOfAgreementPage'
import StartPage from '../pages/start/StartPage'
import SignUpSuccessPage from '../pages/signup/success/SignUpSuccessPage'
import ChooseNumberToVarifyPage from '../pages/signup/channel-preferences/landline-telephone-authentication/ChooseNumberToVarifyPage'
// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]

// start routes
const startRoutes = [{ path: '/', component: <StartPage /> }]

// sign in routes
const signinRoutes = [
  { path: '/signin', component: <SignInPage /> },
  { path: '/signin/validate', component: <SignInValidatePage /> }
]

// sign out routes
const signOutRoutes = [
  { path: '/signout-auto', component: <SignOutAutomaticallyPage /> },
  { path: '/signout', component: <SignOutManuallyPage /> }
]

const signBackInRoutes = [
  { path: '/sign-back-in', component: <SignBackInPage /> }
]
// sign up routes
const signupRoutes = [
  { path: '/signup', component: <SignUpPage /> },
  {
    path: '/signup/validate',
    component: <SignUpValidationPage />
  },
  {
    path: '/signup/contactpreferences',
    component: <WarningContactsPreferencePage />
  },
  // register a location
  {
    path: '/signup/register-location/search',
    component: <LocationSearchPage />
  },
  {
    path: '/signup/register-location/search-results',
    component: <LocationSearchResultsPage />
  },
  {
    path: '/signup/register-location/location-in-severe-warning-area',
    component: <LocationInSevereWarningAreaPage />
  },
  {
    path: '/signup/register-location/location-in-alert-area',
    component: <LocationInAlertAreaPage />
  },
  {
    path: '/signup/register-location/no-danger',
    component: <LocationNotNearDangerPage />
  },
  // mobile phone authentication route
  {
    path: '/signup/contactpreferences/mobile/add',
    component: <AddMobilePhonePage />
  },
  {
    path: '/signup/contactpreferences/mobile/validate',
    component: <ValidateMobilePhonePage />
  },
  {
    path: '/signup/contactpreferences/mobile/skipconfirmation',
    component: <SkipConfirmMobilePhonePage />
  },
  // landline authentication route
  {
    path: '/signup/contactpreferences/landline/add',
    component: <AddLandlinePhonePage />
  },
  {
    path: '/signup/contactpreferences/landline/choosenumber',
    component: <ChooseNumberToVarifyPage />
  },
  {
    path: '/signup/contactpreferences/landline/validate',
    component: <ValidateLandlinePhonePage />
  },
  {
    path: '/signup/contactpreferences/landline/skipconfirmation',
    component: <SkipConfirmLandlinePhonePage />
  },
  { path: '/signup/accountname/add', component: <AddFullNamePage /> },
  {
    path: '/signup/feedback',
    component: <SignUpFeedbackPage />
  },
  {
    path: '/declaration',
    component: <DeclarationOfAgreementPage />
  },
  {
    path: '/signup/duplicate',
    component: <SignUpDuplicateEmailPage />
  },
  {
    path: '/signup/success',
    component: <SignUpSuccessPage />
  }
]

// footer routes
const footerRoutes = [
  { path: '/contact', component: <ContactUsPage /> },
  { path: '/privacy', component: <PrivacyNoticePage /> },
  { path: '/cookies', component: <CookiesPage /> },
  {
    path: '/accessibility-statement',
    component: <AccessibilityStatementPage />
  },
  { path: '/terms-and-conditions', component: <TermsAndConditionsPage /> }
]

// home
const homeRoutes = [{ path: '/home', component: <HomePage /> }]

// account
const accountRoutes = [
  { path: '/account', component: <AccountPage /> },
  { path: '/account/change-business-details', component: <ChangeBusinessDetailsPage /> },
  { path: '/account/change-email', component: <ChangeEmailPage /> },
  { path: '/account/change-email/validate', component: <ChangeEmailValidationPage /> },
  { path: '/account/change-name', component: <ChangeNamePage /> }]

// contact routes
const contactRoutes = [
  { path: '/managecontacts', component: <ContactDetailsPage /> },
  {
    path: '/managecontacts/confirm-delete',
    component: <ConfirmDeleteContactDetailsPage />
  },
  { path: '/managecontacts/add-email', component: <AddEmailPage /> },
  {
    path: '/managecontacts/validate-email',
    component: <AddEmailValidatePage />
  },
  { path: '/managecontacts/add-mobile', component: <AddMobilePage /> },
  {
    path: '/managecontacts/validate-mobile',
    component: <AddMobileValidatePage />
  },
  { path: '/managecontacts/add-landline', component: <AddLandlinePage /> },
  {
    path: '/managecontacts/validate-landline',
    component: <AddLandlineValidatePage />
  }
]

export const routes = [
  ...indexRoutes,
  ...startRoutes,
  ...signupRoutes,
  ...signinRoutes,
  ...signupRoutes,
  ...signBackInRoutes,
  ...footerRoutes
]

export const authenticatedRoutes = [
  ...homeRoutes,
  ...contactRoutes,
  ...signOutRoutes,
  ...accountRoutes
]
