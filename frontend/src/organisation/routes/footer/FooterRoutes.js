import React from 'react'

import PrivacyNoticePage from '../../pages/footer/PrivacyNoticePage'

const urlFooterOrg = '/organisation'

const orgFooterRoutes = [
  { path: urlFooterOrg + '/privacy', component: <PrivacyNoticePage /> }
]

export default orgFooterRoutes
