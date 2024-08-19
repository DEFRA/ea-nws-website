import React from 'react'
import citizenAccountRoutes from './citizen/routes/account/AccountRoutes'
import citizenHomeRoutes from './citizen/routes/home/HomeRoutes'
import citizenManageContactRoutes from './citizen/routes/manage-contacts/manageContactRoutes'
import citizenManageLocationRoutes from './citizen/routes/manage-locations/ManageLocationsRoutes'
import citizenSigninRoutes from './citizen/routes/sign-in/SignInRoutes'
import citizenSignupRoutes from './citizen/routes/sign-up/SignUpRoutes'
import Index from './common/pages/Index'
import commonFooterRoutes from './common/routes/footer/FooterRoutes'
import commonSignOutRoutes from './common/routes/sign-out/SignOutRoutes'
import commonStartRoutes from './common/routes/start/StartRoutes'
import orgRegistrationRoutes from './organisation/routes/sign-up/SignUpRoutes'

// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]

export const routes = [
  ...indexRoutes,
  ...commonStartRoutes,
  ...citizenSignupRoutes,
  ...citizenSigninRoutes,
  ...citizenSignupRoutes,
  ...commonFooterRoutes,
  ...orgRegistrationRoutes
]

export const authenticatedRoutes = [
  ...citizenHomeRoutes,
  ...citizenManageContactRoutes,
  ...commonSignOutRoutes,
  ...citizenAccountRoutes,
  ...citizenManageLocationRoutes
]
