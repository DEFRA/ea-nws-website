import React from 'react'
import { default as citizenAccountRoutes } from './citizen/routes/account/AccountRoutes'
import { default as citizenHomeRoutes } from './citizen/routes/home/HomeRoutes'
import { default as citizenManageContactRoutes } from './citizen/routes/manage-contacts/manageContactRoutes'
import { default as citizenManageLocationRoutes } from './citizen/routes/manage-locations/ManageLocationsRoutes'
import { default as citizenSigninRoutes } from './citizen/routes/sign-in/SignInRoutes'
import { default as citizenSignupRoutes } from './citizen/routes/sign-up/SignUpRoutes'
import Index from './common/pages/Index'
import { default as commonFooterRoutes } from './common/routes/footer/FooterRoutes'
import { default as commonSignOutRoutes } from './common/routes/sign-out/SignOutRoutes'
import { default as commonStartRoutes } from './common/routes/start/StartRoutes'

// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]

export const routes = [
  ...indexRoutes,
  ...commonStartRoutes,
  ...citizenSignupRoutes,
  ...citizenSigninRoutes,
  ...citizenSignupRoutes,
  ...commonFooterRoutes
]

export const authenticatedRoutes = [
  ...citizenHomeRoutes,
  ...citizenManageContactRoutes,
  ...commonSignOutRoutes,
  ...citizenAccountRoutes,
  ...citizenManageLocationRoutes
]
