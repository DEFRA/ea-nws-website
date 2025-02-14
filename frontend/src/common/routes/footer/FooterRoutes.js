import AccessibilityStatementPage from '../../pages/footer/AccessibilityStatementPage'
import CookiesPage from '../../pages/footer/CookiesPage'

// footer routes
const footerRoutes = [

  { path: '/cookies', component: <CookiesPage /> },
  {
    path: '/accessibility-statement',
    component: <AccessibilityStatementPage />
  }
]

export default footerRoutes
