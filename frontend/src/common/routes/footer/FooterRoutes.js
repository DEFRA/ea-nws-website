import AccessibilityStatementPage from '../../pages/footer/AccessibilityStatementPage'
import ContactUsPage from '../../pages/footer/ContactUsPage'
import CookiesPage from '../../pages/footer/CookiesPage'

// footer routes
const footerRoutes = [
  { path: '/contact', component: <ContactUsPage /> },
  { path: '/cookies', component: <CookiesPage /> },
  {
    path: '/accessibility-statement',
    component: <AccessibilityStatementPage />
  }
]

export default footerRoutes
