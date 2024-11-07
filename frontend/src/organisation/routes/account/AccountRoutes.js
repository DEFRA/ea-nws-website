import ManageOrganisationDetailsPage from '../../pages/account/ManageOrganisationDetailsPage'
import ManageAdmindetailsPage from '../../pages/account/manage-admin-details/ManageAdminDetailsPage.js.js'
import ChangeAdminDetailsPage from '../../pages/account/manage-admin-details/ChangeAdminDetailsPage.js'
import ValidateNewAdminEmailPage from '../../pages/account/manage-admin-details/ValidateNewAdminEmailPage.js'
const urlOrg = '/organisation'
const urlManageAdmin = urlOrg + '/manage-admin'

const orgAccountUrls = {
  organisation: {
    orgDetails: urlOrg + '/manage-organisation-details'
  },
  admin: {
    details: urlManageAdmin + '/admin-details',
    changeDetails: urlManageAdmin + '/change-admin-details',
    verifyEmail: urlManageAdmin + '/verify-email'
  }
}

const orgManageAccountRoutes = [
  {
    path: orgAccountUrls.organisation.orgDetails,
    component: <ManageOrganisationDetailsPage />
  },
  // admin
  {
    path: orgAccountUrls.admin.details,
    component: <ManageAdmindetailsPage />
  },
  {
    path: orgAccountUrls.admin.changeDetails,
    component: <ChangeAdminDetailsPage />
  },
  {
    path: orgAccountUrls.admin.verifyEmail,
    component: <ValidateNewAdminEmailPage />
  }
]

export { orgManageAccountRoutes, orgAccountUrls }
