import ManageKeywordsPage from '../../pages/manage-keywords/ManageKeywordsPage'

const urlManageKeywordsOrg = '/organisation/manage-keywords'

// Manage keyword routes
const orgManageKeywordsRoutes = [
  {
    path: urlManageKeywordsOrg,
    component: <ManageKeywordsPage />
  }
]

export { orgManageKeywordsRoutes, urlManageKeywordsOrg }
