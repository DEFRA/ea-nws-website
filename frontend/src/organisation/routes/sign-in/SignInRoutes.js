import SignInPage from '../../pages/sign-in/SignInPage'
import SignInValidatePage from '../../pages/sign-in/SignInValidatePage'

// sign in routes
const signinRoutes = [
  { path: 'organisation/signin', component: <SignInPage /> },
  { path: 'organisation/signin/validate', component: <SignInValidatePage /> }
]

export default signinRoutes
