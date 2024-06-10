import React from 'react'
import Index from '../pages/Index'
import ConfirmDeleteContactDetailsPage from '../pages/contact-details/ConfirmDeleteContactDetailsPage'
import ContactDetailsPage from '../pages/contact-details/ContactDetailsPage'
import HomePage from '../pages/home/HomePage'
import SignInPage from '../pages/signIn/SignInStartPage'
import SignInValidatePage from '../pages/signIn/SignInValidatePage'
import SignUpPage from '../pages/signup/account/SignUpPage'
import SignUpValidationPage from '../pages/signup/account/SignUpValidationPage'
import WarningContactsPreferencePage from '../pages/signup/channel-preferences/WarningContactsPreferencePage'
import AddLandlinePhonePage from '../pages/signup/channel-preferences/landline-telephone-authentication/AddLandlinePhonePage'
import SkipConfirmLandlinePhonePage from '../pages/signup/channel-preferences/landline-telephone-authentication/SkipConfirmLandlinePhonePage'
import ValidateLandlinePhonePage from '../pages/signup/channel-preferences/landline-telephone-authentication/ValidateLandlinePhonePage'
import AddMobilePhonePage from '../pages/signup/channel-preferences/mobile-telephone-authentication/AddMobilePhonePage'
import SkipConfirmMobilePhonePage from '../pages/signup/channel-preferences/mobile-telephone-authentication/SkipConfirmMobilePhonePage'
import ValidateMobilePhonePage from '../pages/signup/channel-preferences/mobile-telephone-authentication/ValidateMobilePhonePage'
import DeclarationOfAgreementPage from '../pages/signup/user-agreement/DeclarationOfAgreementPage'
import StartPage from '../pages/start/StartPage'

// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]

// start routes
const startRoutes = [{ path: '/', component: <StartPage /> }]

// sign in routes
const siginRoutes = [
  { path: '/signin', component: <SignInPage /> },
  { path: '/signin/validate', component: <SignInValidatePage /> }
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
    path: '/signup/contactpreferences/landline/validate',
    component: <ValidateLandlinePhonePage />
  },
  {
    path: '/signup/contactpreferences/landline/skipconfirm',
    component: <SkipConfirmLandlinePhonePage />
  },
  {
    path: '/declaration',
    component: <DeclarationOfAgreementPage />
  }
]

// home
const homeRoutes = [{ path: '/home', component: <HomePage /> }]

// contact routes
const contactRoutes = [
  { path: '/managecontacts', component: <ContactDetailsPage /> },
  {
    path: '/managecontacts/confirm-delete',
    component: <ConfirmDeleteContactDetailsPage />
  }
]

const routes = [
  ...indexRoutes,
  ...startRoutes,
  ...signupRoutes,
  ...siginRoutes,
  ...signupRoutes,
  ...homeRoutes,
  ...contactRoutes
]

export default routes
