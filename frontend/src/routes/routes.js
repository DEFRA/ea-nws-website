import { default as React, default as React } from 'react'
import ConfirmDeleteContactDetailsPage from '../pages/ContactDetails/ConfirmDeleteContactDetailsPage'
import ContactDetailsPage from '../pages/ContactDetails/ContactDetailsPage'
import StartPage from '../pages/StartPage'
import HomePage from '../pages/home/HomePage'
import InitialEmailRegistrationPage from '../pages/register/InitialEmailRegistrationPage'
import ValidateEmailForRegistration from '../pages/register/ValidateEmailForRegistration'
import SignInPage from '../pages/signIn/SignInStartPage'
import CheckYourEmailPage from '../pages/signIn/SignInValidatePage'
import SignBackIn from '../pages/signOut/SignBackIn'
import SignOutAutomatically from '../pages/signOut/SignOutAutomatically'
import SignOutManually from '../pages/signOut/SignOutManually'

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
    path: '/ValidateEmailForRegistration',
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
  ...startRoutes,
  ...siginRoutes,
  ...registerRoutes,
  ...homeRoutes,
  ...contactRoutes
]

export default routes

//start routes

const authenticatedRoutes = [
  {
    path: '/signoutmanually',
    component: <SignOutManually />
  },
  {
    path: '/signoutautomatically',
    component: <SignOutAutomatically />
  }
]

//contact routes
const unauthenticatedRoutes = [
  {
    path: '/signbackin',
    component: <SignBackIn />
  },

  { path: '/start', component: <StartPage /> },
  {
    path: '/signin',
    component: <SignInPage />
  },
  {
    path: '/checkyouremail',
    component: <CheckYourEmailPage />
  },
  {
    path: '/register',
    component: <InitialEmailRegistrationPage />
  },
  {
    path: '/Validateemailforregistration',
    component: <ValidateEmailForRegistration />
  }
]

export const unAuthRoutes = [...unauthenticatedRoutes]
export const authRoutes = [...authenticatedRoutes]
export const routes = [...authRoutes, ...unAuthRoutes]
//const routes = [...unAuthRoutes, ...authRoutes]

//export default routes
