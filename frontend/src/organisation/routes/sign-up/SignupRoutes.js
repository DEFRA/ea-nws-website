import CheckYourAnswersPage from '../../pages/sign-up/review/CheckYourAnswersPage'
import SubmissionSuccessPage from '../../pages/sign-up/submission/SubmissionSuccessPage'

const organisationSignupRoutes = [
  { path: '/organisation/signup/review', component: <CheckYourAnswersPage /> },
  { path: '/organisation/signup/success', component: <SubmissionSuccessPage /> }
]

export default organisationSignupRoutes
