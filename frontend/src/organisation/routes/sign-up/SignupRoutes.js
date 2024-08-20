import CheckYourAnswersPage from '../../pages/sign-up/review/CheckYourAnswersPage'
import SignUpOrganisationSuccessPage from '../../pages/sign-up/success/SignUpOrganisationSuccessPage'

const organisationSignupRoutes = [
  { path: '/organisation/signup/review', component: <CheckYourAnswersPage /> },
  { path: '/organisation/signup/success', component: <SignUpOrganisationSuccessPage /> }
]

export default organisationSignupRoutes
