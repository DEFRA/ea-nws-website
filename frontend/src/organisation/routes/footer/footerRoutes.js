import React from "react";
import OrgTermsConditionsPage from "../../footer/OrgTermsConditionsPage";
import OrgPrivacyNoticePage from "../../footer/OrgPrivacyNoticePage";

const urlFooterOrg = '/organisation'

const orgFooterRoutes = [
    {path: urlFooterOrg + '/declaration', component: <OrgTermsConditionsPage/>},
    {path: urlFooterOrg + '/privacy', component: <OrgPrivacyNoticePage />}
]

export default orgFooterRoutes