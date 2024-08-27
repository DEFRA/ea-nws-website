import React from 'react'
import citizenAccountRoutes from './citizen/routes/account/AccountRoutes'
import citizenHomeRoutes from './citizen/routes/home/HomeRoutes'
import citizenManageContactRoutes from './citizen/routes/manage-contacts/manageContactRoutes'
import citizenManageLocationRoutes from './citizen/routes/manage-locations/ManageLocationsRoutes'
import citizenSigninRoutes from './citizen/routes/sign-in/SignInRoutes'
import citizenSignupRoutes from './citizen/routes/sign-up/SignUpRoutes'
import ErrorPage from './common/pages/ErrorPage'
import Index from './common/pages/Index'
import commonFooterRoutes from './common/routes/footer/FooterRoutes'
import commonSignOutRoutes from './common/routes/sign-out/SignOutRoutes'
import commonStartRoutes from './common/routes/start/StartRoutes'
import orgHomeRoutes from './organisation/routes/home/HomeRoutes'
import orgSigninRoutes from './organisation/routes/sign-in/SignInRoutes'
import orgRegistrationRoutes from './organisation/routes/sign-up/SignUpRoutes'
import orgUnmatchedLocationsROutes from './organisation/routes/add-locations-in-bulk/unmatched-locations/UnmatchedLocationsRoutes'

// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]
const errorRoutes = [{ path: '/error', component: <ErrorPage /> }]

export const routes = [
  ...indexRoutes,
  ...errorRoutes,
  ...commonStartRoutes,
  ...citizenSignupRoutes,
  ...citizenSigninRoutes,
  ...commonFooterRoutes,
  ...orgSigninRoutes,
  ...orgRegistrationRoutes,
  ...orgUnmatchedLocationsROutes
]

export const authenticatedRoutes = [
  ...citizenHomeRoutes,
  ...citizenManageContactRoutes,
  ...commonSignOutRoutes,
  ...citizenAccountRoutes,
  ...citizenManageLocationRoutes,
  ...orgHomeRoutes
]
