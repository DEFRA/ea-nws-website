import PrivacyNoticePage from '../../pages/footer/PrivacyNoticePage'
import TermsAndConditionsPage from '../../pages/footer/TermsAndConditionsPage'

const footerRoutes = [
  { path: '/privacy', component: <PrivacyNoticePage /> },
  { path: '/terms-and-conditions', component: <TermsAndConditionsPage /> }
]

export default footerRoutes
