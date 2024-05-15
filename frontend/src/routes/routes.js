import React from 'react'
import StartPage from '../pages/StartPage'
import SignInStart from '../pages/signIn/SignInStartPage'
import SignInValidate from '../pages/signIn/SignInValidatePage'

const routes = [
  { path: '/start', component: <StartPage /> },
  { path: '/SignInStart', component: <SignInStart /> },
  { path: '/SignInValidate', component: <SignInValidate /> }
]

export default routes
