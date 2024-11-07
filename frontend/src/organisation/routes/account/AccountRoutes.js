import ManageOrganisationDetailsPage from '../../pages/account/ManageOrganisationDetailsPage'
import ManageAdminDetailsPage from '../../pages/account/manage-admin-details/ManageAdminDetailsPage'
import ChangeAdminDetailsPage from '../../pages/account/manage-admin-details/ChangeAdminDetailsPage'
import ValidateNewAdminEmailPage from '../../pages/account/manage-admin-details/ValidateNewAdminEmailPage'
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
    component: <ManageAdminDetailsPage />
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
