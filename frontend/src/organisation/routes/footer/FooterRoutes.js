import React from 'react'

import PrivacyNoticePage from '../../pages/footer/PrivacyNoticePage'
import TermsAndConditionsPage from '../../pages/footer/TermsAndConditionsPage'
const urlFooterOrg = '/organisation'

const orgFooterRoutes = [
  { path: urlFooterOrg + '/privacy', component: <PrivacyNoticePage /> },
  {
    path: urlFooterOrg + '/terms-and-conditions', component: <TermsAndConditionsPage />
  }
]

export default orgFooterRoutes
