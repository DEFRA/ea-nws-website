import React from 'react'
import Index from '../pages/Index'
import accountRoutes from './account/AccountRoutes'
import footerRoutes from './footer/FooterRoutes'
import homeRoutes from './home/HomeRoutes'
import manageContactRoutes from './manage-contacts/manageContactRoutes'
import signinRoutes from './sign-in/SignInRoutes'
import signOutRoutes from './sign-out/SignOutRoutes'
import signupRoutes from './sign-up/SignUpRoutes'
import startRoutes from './start/StartRoutes'

// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]

export const routes = [
  ...indexRoutes,
  ...startRoutes,
  ...signupRoutes,
  ...signinRoutes,
  ...signupRoutes,
  ...footerRoutes
]

export const authenticatedRoutes = [
  ...homeRoutes,
  ...manageContactRoutes,
  ...signOutRoutes,
  ...accountRoutes
]
