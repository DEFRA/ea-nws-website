import SignInPage from '../../pages/sign-in/SignInPage'
import SignInValidatePage from '../../pages/sign-in/SignInValidatePage'
import SignBackInPage from '../../pages/sign-out/SignBackInPage'

// sign in routes
const signinRoutes = [
  { path: '/signin', component: <SignInPage /> },
  { path: '/signin/validate', component: <SignInValidatePage /> },
  { path: '/sign-back-in', component: <SignBackInPage /> }
]

export default signinRoutes
