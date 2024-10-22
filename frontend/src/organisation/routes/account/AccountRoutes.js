import ManageOrganisationDetailsPage from '../../pages/account/ManageOrganisationDetailsPage'
import ManageAdmindetailsPage from '../../pages/account/manage-admin-details/ManageAdminDetailsPage.js.js'

const urlOrg = '/organisation'
const urlManageAdmin = urlOrg + '/manage-admin'

const accountUrls = {
  organisation:{
    orgDetails: urlOrg + '/manage-organisation-details'
  },
  admin:{ 
    details: urlManageAdmin + '/admin-details'

  }
}

const accountRoutes = [
  {
    path: accountUrls.organisation.orgDetails,
    component: <ManageOrganisationDetailsPage/>
  },
  {
    path: accountUrls.admin.details,
    component: <ManageAdmindetailsPage/>
  }
]

export {accountRoutes,accountUrls}
