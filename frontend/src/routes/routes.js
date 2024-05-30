import React from 'react'
import Index from '../pages/Index'
import ConfirmDeleteContactDetailsPage from '../pages/contact-details/ConfirmDeleteContactDetailsPage'
import ContactDetailsPage from '../pages/contact-details/ContactDetailsPage'
import HomePage from '../pages/home/HomePage'
import SignInPage from '../pages/signIn/SignInStartPage'
import CheckYourEmailPage from '../pages/signIn/SignInValidatePage'
import InitialEmailRegistrationPage from '../pages/signup/account/InitialEmailRegistrationPage'
import ValidateEmailForRegistration from '../pages/signup/account/ValidateEmailForRegistration'
import WarningContactsPreferencePage from '../pages/signup/channel-preferences/WarningContactsPreferencePage'
import StartPage from '../pages/start/StartPage'

// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]

// start routes
const startRoutes = [{ path: '/', component: <StartPage /> }]

// sign up routes
const signupRoutes = [
  { path: '/signup', component: <InitialEmailRegistrationPage /> },
  {
    path: '/signup/validate',
    component: <ValidateEmailForRegistration />
  },
  {
    path: '/signup/contactpreferences',
    component: <WarningContactsPreferencePage />
  }
]

// sign in routes
const siginRoutes = [
  { path: '/signin', component: <SignInPage /> },
  { path: '/signin/validate', component: <CheckYourEmailPage /> }
]

// home
const homeRoutes = [{ path: '/home', component: <HomePage /> }]

// contact routes
const contactRoutes = [
  { path: '/managecontacts', component: <ContactDetailsPage /> },
  {
    path: '/managecontacts/confirm',
    component: <ConfirmDeleteContactDetailsPage />
  }
]

const routes = [
  ...indexRoutes,
  ...startRoutes,
  ...signupRoutes,
  ...siginRoutes,
  ...homeRoutes,
  ...contactRoutes
]

export default routes
