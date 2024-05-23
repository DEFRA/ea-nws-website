import React from 'react'
import ConfirmDeleteContactDetailsPage from '../pages/contact-details/ConfirmDeleteContactDetailsPage'
import ContactDetailsPage from '../pages/contact-details/ContactDetailsPage'
import Index from '../pages/Index'
import HomePage from '../pages/home/HomePage'
import SignInPage from '../pages/signIn/SignInStartPage'
import CheckYourEmailPage from '../pages/signIn/SignInValidatePage'
import ValidateEmailForRegistration from '../pages/signup/account/ValidateEmailForRegistration'
import InitialEmailRegistrationPage from '../pages/signup/account/InitialEmailRegistrationPage'
import StartPage from '../pages/start/StartPage'

// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]

// start routes
const startRoutes = [{ path: '/', component: <StartPage /> }]

// sign in routes
const siginRoutes = [
  { path: '/signin', component: <SignInPage /> },
  { path: '/signin/validate', component: <CheckYourEmailPage /> }
]

//register routes
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

const routes = [
  ...indexRoutes,
  ...startRoutes,
  ...siginRoutes,
  ...registerRoutes,
  ...homeRoutes,
  ...contactRoutes
]

export default routes
