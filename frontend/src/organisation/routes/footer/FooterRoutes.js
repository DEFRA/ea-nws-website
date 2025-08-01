import React from 'react'
import PrivacyNoticePage from '../../pages/footer/PrivacyNoticePage'
import TermsAndConditionsPage from '../../pages/footer/TermsAndConditionsPage'
import ContactUsPage from '../../pages/footer/ContactUsPage'
import CookiesPage from '../../../common/pages/footer/CookiesPage'
import AccessibilityStatementPage from '../../../common/pages/footer/AccessibilityStatementPage'
const urlFooterOrg = '/organisation'

const orgFooterRoutes = [
  { path: urlFooterOrg + '/privacy', component: <PrivacyNoticePage /> },
  {
    path: urlFooterOrg + '/terms-and-conditions', component: <TermsAndConditionsPage />
  },
  { path: urlFooterOrg + '/contact', component: <ContactUsPage /> },
  { path: urlFooterOrg + '/cookies', component: <CookiesPage /> },
  { path: urlFooterOrg + '/accessibility-statement', component: <AccessibilityStatementPage /> }
]

export default orgFooterRoutes
