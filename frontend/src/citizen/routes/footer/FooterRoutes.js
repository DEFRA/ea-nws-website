import PrivacyNoticePage from '../../pages/footer/PrivacyNoticePage'
import TermsAndConditionsPage from '../../pages/footer/TermsAndConditionsPage'
import ContactUsPage from '../../pages/footer/ContactUsPage'
import CookiesPage from '../../../common/pages/footer/CookiesPage'
import AccessibilityStatementPage from '../../../common/pages/footer/AccessibilityStatementPage'

const footerRoutes = [
  { path: '/contact', component: <ContactUsPage /> },
  { path: '/privacy', component: <PrivacyNoticePage /> },
  { path: '/terms-and-conditions', component: <TermsAndConditionsPage /> },
  { path: '/cookies', component: <CookiesPage /> },
  { path: '/accessibility-statement', component: <AccessibilityStatementPage /> }
]

export default footerRoutes
