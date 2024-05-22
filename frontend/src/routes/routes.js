import { default as React } from 'react'
import ConfirmDeleteContactDetailsPage from '../pages/ContactDetails/ConfirmDeleteContactDetailsPage'
import ContactDetailsPage from '../pages/ContactDetails/ContactDetailsPage'
import Index from '../pages/Index'
import HomePage from '../pages/home/HomePage'
import InitialEmailRegistrationPage from '../pages/register/InitialEmailRegistrationPage'
import ValidateEmailForRegistration from '../pages/register/ValidateEmailForRegistration'
import SignInPage from '../pages/signIn/SignInStartPage'
import CheckYourEmailPage from '../pages/signIn/SignInValidatePage'
import SignBackIn from '../pages/signOut/SignBackIn'
import SignOutAutomatically from '../pages/signOut/SignOutAutomatically'
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
const signBackRoute = [{ path: '/signbackin', component: <SignBackIn /> }]
const signOutRoutes = [
  { path: 'signout/automatically', component: <SignOutAutomatically /> },
  { path: '/signout/manually', component: <signOutManually /> }
]

export const routes = [
  ...indexRoutes,
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
