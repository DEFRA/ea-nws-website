import React from 'react'
import PrivacyNoticePage from '../../pages/footer/PrivacyNoticePage'
import TermsAndConditionsPage from '../../pages/footer/TermsAndConditionsPage'
import ContactUsPage from '../../pages/footer/ContactUsPage'
const urlFooterOrg = '/organisation'

const orgFooterRoutes = [
  { path: urlFooterOrg + '/privacy', component: <PrivacyNoticePage /> },
  {
    path: urlFooterOrg + '/terms-and-conditions', component: <TermsAndConditionsPage />
  },
  { path: urlFooterOrg + '/contact', component: <ContactUsPage /> }
]

export default orgFooterRoutes
