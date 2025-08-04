import SignBackInPage from '../../../common/pages/sign-in/SignBackInPage'
import SignInPage from '../../../common/pages/sign-in/SignInPage'
import SignInValidatePage from '../../../common/pages/sign-in/SignInValidatePage'
import AccountPendingPage from '../../../organisation/pages/sign-in/AccountPendingPage'
import InitialLoginAdminPage from '../../../organisation/pages/sign-in/InitialLoginAdminPage'

// sign in routes
const signInRoutes = [
  { path: '/sign-in', component: <SignInPage /> },
  { path: '/sign-in/validate', component: <SignInValidatePage /> },
  { path: '/sign-back-in', component: <SignBackInPage /> },
  {
    path: '/sign-in/organisation/account-pending',
    component: <AccountPendingPage />
  },
  {
    path: '/sign-in/organisation/admin-controls',
    component: <InitialLoginAdminPage />
  }
]

export default signInRoutes
