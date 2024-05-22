import { default as React } from 'react'
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

const signOutRoutes = [
  {
    path: '/signoutmanually',
    component: <SignOutManually />
  },
  {
    path: '/signoutautomatically',
    component: <SignOutAutomatically />
  }
]

const signBackRoute = [
  {
    path: '/signbackin',
    component: <SignBackIn />
  }
]

//export all routes
export const routes = [
  ...startRoutes,
  ...siginRoutes,
  ...registerRoutes,
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
  ...signBackRoute
]
