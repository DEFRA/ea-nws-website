import React from 'react'
import StartPage from '../pages/StartPage'
import InitialEmailRegistrationPage from '../pages/register/InitialEmailRegistrationPage'
import ValidateEmailForRegistration from '../pages/register/ValidateEmailForRegistration'
import SignInPage from '../pages/signIn/SignInStartPage'
import CheckYourEmailPage from '../pages/signIn/SignInValidatePage'
import SignBackIn from '../pages/signOut/SignBackIn'
import SignOutAutomatically from '../pages/signOut/SignOutAutomatically'
import SignOutManually from '../pages/signOut/SignOutManually'

//start routes

const authenticatedRoutes = [
  {
    path: '/SignOutManually',
    component: <SignOutManually />
  },
  {
    path: '/SignOutAutomatically',
    component: <SignOutAutomatically />
  }
]

//contact routes
const unauthenticatedRoutes = [
  {
    path: '/SignBackIn',
    component: <SignBackIn />
  },
  {
    path: '/start',
    component: <StartPage />
  },

  { path: '/Start', component: <StartPage /> },
  {
    path: '/SignInPage',
    component: <SignInPage />
  },
  {
    path: '/CheckYourEmailPage',
    component: <CheckYourEmailPage />
  },
  {
    path: '/register',
    component: <InitialEmailRegistrationPage />
  },
  {
    path: '/ValidateEmailForRegistration',
    component: <ValidateEmailForRegistration />
  }
]

export const unAuthRoutes = [...unauthenticatedRoutes]
export const authRoutes = [...authenticatedRoutes]
export const routes = [...authRoutes, ...unAuthRoutes]
//const routes = [...unAuthRoutes, ...authRoutes]

//export default routes
