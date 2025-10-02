import AdminInvitePage from '../../pages/manage-contact/add-admin/AdminInvitePage'
import AdminJoinedPage from '../../pages/manage-contact/add-admin/AdminJoinedPage'

const urlInviteOrg = '/organisation/invite'

const orgInviteUrls = {
    admin: {
        invite: urlInviteOrg,
        joined: urlInviteOrg + '/joined'
    }
}

const orgInviteRoutes = [
    {
      path: orgInviteUrls.admin.invite,
      component: <AdminInvitePage />
    },
    {
      path: orgInviteUrls.admin.joined,
      component: <AdminJoinedPage />
    }
  ]

export { orgInviteRoutes, orgInviteUrls }
