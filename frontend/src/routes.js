import citizenAccountRoutes from './citizen/routes/account/AccountRoutes'
import footerRoutes from './citizen/routes/footer/FooterRoutes'
import citizenHomeRoutes from './citizen/routes/home/HomeRoutes'
import citizenManageContactRoutes from './citizen/routes/manage-contacts/manageContactRoutes'
import citizenManageLocationRoutes from './citizen/routes/manage-locations/ManageLocationsRoutes'
import citizenSignupRoutes from './citizen/routes/sign-up/SignUpRoutes'
import ErrorPage from './common/pages/ErrorPage'
import Index from './common/pages/Index'
import osTermsRoutes from './common/routes/os-terms/OsTermsRoutes'
import signinRoutes from './common/routes/sign-in/SignInRoutes'
import commonSignOutRoutes from './common/routes/sign-out/SignOutRoutes'
import { orgManageAccountRoutes } from './organisation/routes/account/AccountRoutes'
import { orgFloodReportsRoutes } from './organisation/routes/flood-reports/FloodReportsRoutes'
import orgFooterRoutes from './organisation/routes/footer/FooterRoutes'
import { infoRoutes } from './organisation/routes/info/InfoRoutes'
import { orgInviteRoutes } from './organisation/routes/invite/InviteRoutes'
import { orgManageContactsRoutes } from './organisation/routes/manage-contacts/ManageContactsRoutes'
import { orgManageKeywordsRoutes } from './organisation/routes/manage-keywords/ManageKeywordsRoutes'
import { orgManageLocationRoutes } from './organisation/routes/manage-locations/ManageLocationsRoutes'
import { orgSignUpRoutes } from './organisation/routes/sign-up/SignUpRoutes'

import optOutRoutes from './common/routes/opt-out/OptOutRoutes'
import privateBetaRoutes from './common/routes/private-beta/PrivateBetaRoutes'

// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]
const errorRoutes = [{ path: '/error', component: <ErrorPage /> }]

export const routes = [
  ...indexRoutes,
  ...errorRoutes,
  ...signinRoutes,
  ...citizenSignupRoutes,
  ...footerRoutes,
  ...orgSignUpRoutes,
  ...orgFooterRoutes,
  ...infoRoutes,
  ...privateBetaRoutes,
  ...optOutRoutes,
  ...orgInviteRoutes,
  ...osTermsRoutes
]

export const authenticatedRoutes = [
  ...citizenHomeRoutes,
  ...citizenManageContactRoutes,
  ...commonSignOutRoutes,
  ...citizenAccountRoutes,
  ...citizenManageLocationRoutes,
  ...orgManageLocationRoutes,
  ...orgManageKeywordsRoutes,
  ...orgManageContactsRoutes,
  ...orgManageAccountRoutes,
  ...orgFloodReportsRoutes
]
