import SignInPage from '../../pages/sign-in/SignInPage'
import SignInValidatePage from '../../pages/sign-in/SignInValidatePage'
import SignBackInPage from '../../pages/sign-out/SignBackInPage'

// sign in routes
const orgSigninRoutes = [
  { path: 'organisation/signin', component: <SignInPage /> },
  { path: 'organisation/signin/validate', component: <SignInValidatePage /> },
  { path: '/organisation/sign-back-in', component: <SignBackInPage /> }
]

export default orgSigninRoutes
