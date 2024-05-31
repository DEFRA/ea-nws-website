import React from 'react'
import Index from '../pages/Index'
import ConfirmDeleteContactDetailsPage from '../pages/contact-details/ConfirmDeleteContactDetailsPage'
import ContactDetailsPage from '../pages/contact-details/ContactDetailsPage'
import HomePage from '../pages/home/HomePage'
import SignInPage from '../pages/signIn/SignInStartPage'
import CheckYourEmailPage from '../pages/signIn/SignInValidatePage'
import SignBackIn from '../pages/signOut/SignBackIn'
import SignOutAutomatically from '../pages/signOut/SignOutAutomatically'
import InitialEmailRegistrationPage from '../pages/signup/account/InitialEmailRegistrationPage'
import SignUpPage from '../pages/signup/account/SignUpPage'
import SignUpValidationPage from '../pages/signup/account/SignUpValidationPage'
import ValidateEmailForRegistration from '../pages/signup/account/ValidateEmailForRegistration'
import WarningContactsPreferencePage from '../pages/signup/channel-preferences/WarningContactsPreferencePage'
import StartPage from '../pages/start/StartPage'
// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]

// start routes
const startRoutes = [{ path: '/', component: <StartPage /> }]

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
  }
]

// sign in routes
const siginRoutes = [
  { path: '/signin', component: <SignInPage /> },
  { path: '/signin/validate', component: <CheckYourEmailPage /> }
]

// register routes
const registerRoutes = [
  { path: '/register', component: <InitialEmailRegistrationPage /> },
  {
    path: '/register/validate',
    component: <ValidateEmailForRegistration />
  }
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
const signBackRoute = [{ path: '/signbackin', component: <SignBackIn /> }]
const signOutRoutes = [
  { path: 'signout/automatically', component: <SignOutAutomatically /> },
  { path: '/signout/manually', component: <signOutManually /> }
]

export const routes = [
  ...indexRoutes,
  ...startRoutes,
  ...signupRoutes,
  ...siginRoutes,
  ...signupRoutes,
  ...homeRoutes,
  ...contactRoutes,
  ...signOutRoutes,
  ...signBackRoute
]
// export unauth routes
export const unAuthRoutes = [
  ...startRoutes,
  ...signupRoutes,
  ...siginRoutes,
  ...signupRoutes,
  ...homeRoutes,
  ...contactRoutes,
  ...signOutRoutes,
  ...signBackRoute
]
// export unauth routes
export const unAuthRoutes = [
  ...startRoutes,
  ...siginRoutes,
  ...registerRoutes,
  ...signBackRoute,
  ...indexRoutes
]
