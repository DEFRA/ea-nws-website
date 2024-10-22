import ManageOrganisationDetailsPage from '../../pages/account/ManageOrganisationDetailsPage'
import ManageAdmindetailsPage from '../../pages/account/manage-admin-details/ManageAdminDetailsPage.js.js'
import ChangeAdminDetailsPage from '../../pages/account/manage-admin-details/ChangeAdminDetailsPage.js'
const urlOrg = '/organisation'
const urlManageAdmin = urlOrg + '/manage-admin'

const accountUrls = {
  organisation: {
    orgDetails: urlOrg + '/manage-organisation-details'
  },
  admin: {
    details: urlManageAdmin + '/admin-details',
    changeDetails: urlManageAdmin + '/change-admin-details'
  }
}

const orgManageAccountRoutes = [
  {
    path: accountUrls.organisation.orgDetails,
    component: <ManageOrganisationDetailsPage />
  },
  // admin
  {
    path: accountUrls.admin.details,
    component: <ManageAdmindetailsPage />
  },
  {
    path: accountUrls.admin.changeDetails,
    component: <ChangeAdminDetailsPage />
  }
]

export { orgManageAccountRoutes, accountUrls }
