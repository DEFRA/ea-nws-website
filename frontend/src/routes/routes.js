import React from 'react'
import StartPage from '../pages/StartPage'
import SignInStart from '../pages/signIn/SignInStartPage'
import SignInValidate from '../pages/signIn/SignInValidatePage'

// start routes
const startRoutes = [{ path: '/', component: <StartPage /> }]

// sign in routes
const siginRoutes = [
  { path: '/signin', component: <SignInStart /> },
  { path: '/signin/validate', component: <SignInValidate /> }
]

const routes = [...startRoutes, ...siginRoutes]

export default routes
