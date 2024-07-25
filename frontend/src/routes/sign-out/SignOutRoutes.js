import SignBackInPage from '../../pages/sign-out/SignBackInPage'
import SignOutAutomaticallyPage from '../../pages/sign-out/SignOutAutomaticallyPage'
import SignOutManuallyPage from '../../pages/sign-out/SignOutManuallyPage'

// sign out routes
const signOutRoutes = [
  { path: '/signout-auto', component: <SignOutAutomaticallyPage /> },
  { path: '/signout', component: <SignOutManuallyPage /> },
  { path: '/sign-back-in', component: <SignBackInPage /> }
]

export default signOutRoutes
