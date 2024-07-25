import SignInPage from '../../pages/sign-in/SignInPage'
import SignInValidatePage from '../../pages/sign-in/SignInValidatePage'

// sign in routes
const signinRoutes = [
  { path: '/signin', component: <SignInPage /> },
  { path: '/signin/validate', component: <SignInValidatePage /> }
]

export default signinRoutes
