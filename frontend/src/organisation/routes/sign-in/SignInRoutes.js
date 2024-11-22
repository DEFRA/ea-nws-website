import SignBackInPage from '../../pages/sign-out/SignBackInPage'
import SignInPage from '../../pages/sign-in/SignInPage'
import SignInValidatePage from '../../pages/sign-in/SignInValidatePage'
import AccountPendingPage from '../../pages/sign-in/AccountPendingPage'
// sign in routes
const orgSigninRoutes = [
  { path: '/organisation/sign-back-in', component: <SignBackInPage /> },
  { path: '/organisation/signin', component: <SignInPage /> },
  { path: '/organisation/signin/validate', component: <SignInValidatePage /> },
  { path: '/organisation/signin/account-pending', component: <AccountPendingPage /> }
]

export default orgSigninRoutes
