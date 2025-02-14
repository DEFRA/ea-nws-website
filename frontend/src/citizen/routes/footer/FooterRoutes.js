import PrivacyNoticePage from '../../pages/footer/PrivacyNoticePage'
import TermsAndConditionsPage from '../../pages/footer/TermsAndConditionsPage'
import ContactUsPage from '../../pages/footer/ContactUsPage'
const footerRoutes = [
  { path: '/contact', component: <ContactUsPage /> },
  { path: '/privacy', component: <PrivacyNoticePage /> },
  { path: '/terms-and-conditions', component: <TermsAndConditionsPage /> }
]

export default footerRoutes
