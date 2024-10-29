import React from 'react'
import citizenAccountRoutes from './citizen/routes/account/AccountRoutes'
import footerRoutes from './citizen/routes/footer/FooterRoutes'
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
import orgManageAccountRoutes from './organisation/routes/account/AccountRoutes'
import orgFooterRoutes from './organisation/routes/footer/FooterRoutes'
import orgHomeRoutes from './organisation/routes/home/HomeRoutes'
import { orManageContactsRoutes } from './organisation/routes/manage-contacts/ManageContactsRoutes'
import { orgManageKeywordsRoutes } from './organisation/routes/manage-keywords/ManageKeywordsRoutes'
import { orgManageLocationRoutes } from './organisation/routes/manage-locations/ManageLocationsRoutes'
import orgSigninRoutes from './organisation/routes/sign-in/SignInRoutes'
import orgSignupRoutes from './organisation/routes/sign-up/SignUpRoutes'
// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]
const errorRoutes = [{ path: '/error', component: <ErrorPage /> }]

export const routes = [
  ...indexRoutes,
  ...errorRoutes,
  ...commonStartRoutes,
  ...citizenSignupRoutes,
  ...citizenSigninRoutes,
  ...footerRoutes,
  ...commonFooterRoutes,
  ...orgSignupRoutes,
  ...orgSigninRoutes,
  ...orgFooterRoutes
]

export const authenticatedRoutes = [
  ...citizenHomeRoutes,
  ...citizenManageContactRoutes,
  ...commonSignOutRoutes,
  ...citizenAccountRoutes,
  ...citizenManageLocationRoutes,
  ...orgHomeRoutes,
  ...orgManageAccountRoutes,
  ...orgManageLocationRoutes,
  ...orgManageKeywordsRoutes,
  ...orManageContactsRoutes
]
