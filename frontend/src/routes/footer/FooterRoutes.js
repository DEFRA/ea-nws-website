import AccessibilityStatementPage from '../../pages/footer/AccessibilityStatementPage'
import ContactUsPage from '../../pages/footer/ContactUsPage'
import CookiesPage from '../../pages/footer/CookiesPage'
import PrivacyNoticePage from '../../pages/footer/PrivacyNoticePage'
import TermsAndConditionsPage from '../../pages/footer/TermsAndConditionsPage'

// footer routes
const footerRoutes = [
  { path: '/contact', component: <ContactUsPage /> },
  { path: '/privacy', component: <PrivacyNoticePage /> },
  { path: '/cookies', component: <CookiesPage /> },
  {
    path: '/accessibility-statement',
    component: <AccessibilityStatementPage />
  },
  { path: '/terms-and-conditions', component: <TermsAndConditionsPage /> }
]

export default footerRoutes
