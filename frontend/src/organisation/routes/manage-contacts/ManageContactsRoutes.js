import AdminInvitePage from '../../pages/manage-contact/add-admin/AdminInvitePage'
import AdminJoinedPage from '../../pages/manage-contact/add-admin/AdminJoinedPage'
import AddContactAdditionalInformationPage from '../../pages/manage-contact/add-contact/AddContactAdditionalInformationPage'
import AddContactChannelsPage from '../../pages/manage-contact/add-contact/AddContactChannelsPage'
import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'
import AddContactEmailPage from '../../pages/manage-contact/add-contact/AddContactEmailPage'
import AddContactKeywordsPage from '../../pages/manage-contact/add-contact/AddContactKeywordsPage'
import AddContactNotesPage from '../../pages/manage-contact/add-contact/AddContactNotesPage'
import AddContactTypePage from '../../pages/manage-contact/add-contact/AddContactTypePage'
import LinkContactToLocationPage from '../../pages/manage-contact/add-contact/LinkContactToLocationPage'
import DeleteContactPage from '../../pages/manage-contact/delete/DeleteContactPage'
import EditContactChannelsPage from '../../pages/manage-contact/edit-contact/EditContactChannelsPage'
import EditContactDetailsPage from '../../pages/manage-contact/edit-contact/EditContactDetailsPage'
import EditContactKeywordsPage from '../../pages/manage-contact/edit-contact/EditContactKeywordsPage'
import EditContactNotesPage from '../../pages/manage-contact/edit-contact/EditContactNotesPage'
import PromoteToAdminPage from '../../pages/manage-contact/manage-admin/PromoteToAdminPage'
import RemoveAdminPage from '../../pages/manage-contact/manage-admin/RemoveAdminPage'
import PendingAdminsPage from '../../pages/manage-contact/manage-admin/pending-admins/PendingAdminsPage'
import ResendInvitePage from '../../pages/manage-contact/manage-admin/pending-admins/ResendInvitePage'
import WithdrawInvitePage from '../../pages/manage-contact/manage-admin/pending-admins/WithdrawInvitePage'
import ViewUsersDashboardPage from '../../pages/manage-contact/view-user/users-dashboard/ViewUsersDashboardPage'
import LinkedLocationsPage from '../../pages/manage-contact/view-user/users-information/LinkedLocationsPage'
import UserInformationPage from '../../pages/manage-contact/view-user/users-information/UserInformationPage'

const urlManageContactsOrg = '/organisation/manage-contacts'
const urlManageContactsAdd = urlManageContactsOrg + '/add'
const urlManageContactsEdit = urlManageContactsOrg + '/edit'
const urlManageContactsAdmin = urlManageContactsOrg + '/admin'

const orgManageContactsUrls = {
  add: {
    typeSelection: urlManageContactsAdd + '/type',
    details: urlManageContactsAdd + '/details',
    email: urlManageContactsAdd + '/email',
    additionalInformation: urlManageContactsAdd + '/additional-information',
    keywords: urlManageContactsAdd + '/keywords',
    channels: urlManageContactsAdd + '/channels',
    notes: urlManageContactsAdd + '/notes',
    linkContactToLocations: urlManageContactsAdd + '/link-contact-to-locations'
  },
  view: {
    dashboard: urlManageContactsOrg + '/view-contacts',
    viewContact: urlManageContactsOrg + '/view-contacts/view',
    viewLinkedLocations: urlManageContactsOrg + '/view-linked-locations'
  },
  edit: {
    details: urlManageContactsEdit,
    keywords: urlManageContactsEdit + '/keywords',
    channels: urlManageContactsEdit + '/channels',
    notes: urlManageContactsEdit + '/notes'
  },
  delete: urlManageContactsOrg + '/delete-contact',
  admin: {
    promote: urlManageContactsOrg + '/promote-contact',
    remove: urlManageContactsOrg + '/remove-admin',
    pendingInvites: urlManageContactsOrg + '/pending-admins',
    resendInvite: urlManageContactsOrg + '/resend-invite',
    withdrawInvite: urlManageContactsOrg + '/withdraw-invite'
  }
}

const orgManageContactsRoutes = [
  // Add
  {
    path: orgManageContactsUrls.add.details,
    component: <AddContactDetailsPage />
  },
  {
    path: orgManageContactsUrls.add.keywords,
    component: <AddContactKeywordsPage />
  },
  {
    path: orgManageContactsUrls.add.channels,
    component: <AddContactChannelsPage />
  },
  {
    path: orgManageContactsUrls.add.notes,
    component: <AddContactNotesPage />
  },
  {
    path: orgManageContactsUrls.add.linkContactToLocations,
    component: <LinkContactToLocationPage />
  },
  {
    path: orgManageContactsUrls.add.typeSelection,
    component: <AddContactTypePage />
  },
  {
    path: orgManageContactsUrls.add.email,
    component: <AddContactEmailPage />
  },
  {
    path: orgManageContactsUrls.add.additionalInformation,
    component: <AddContactAdditionalInformationPage />
  },
  // View
  {
    path: orgManageContactsUrls.view.dashboard,
    component: <ViewUsersDashboardPage />
  },
  {
    path: orgManageContactsUrls.view.viewContact,
    component: <UserInformationPage />
  },
  // Edit
  {
    path: orgManageContactsUrls.edit.details,
    component: <EditContactDetailsPage />
  },
  {
    path: orgManageContactsUrls.edit.keywords,
    component: <EditContactKeywordsPage />
  },
  {
    path: orgManageContactsUrls.view.viewLinkedLocations,
    component: <LinkedLocationsPage />
  },
  {
    path: orgManageContactsUrls.edit.channels,
    component: <EditContactChannelsPage />
  },
  {
    path: orgManageContactsUrls.edit.notes,
    component: <EditContactNotesPage />
  },
  // Delete
  {
    path: orgManageContactsUrls.delete,
    component: <DeleteContactPage />
  },
  // Promote to Admin
  {
    path: orgManageContactsUrls.admin.promote,
    component: <PromoteToAdminPage />
  },
  // Remove Admin
  {
    path: orgManageContactsUrls.admin.remove,
    component: <RemoveAdminPage />
  },
  // Admin Invitation Links
  {
    path: orgManageContactsUrls.admin.pendingInvites,
    component: <PendingAdminsPage />
  },
  {
    path: orgManageContactsUrls.admin.resendInvite,
    component: <ResendInvitePage />
  },
  {
    path: orgManageContactsUrls.admin.withdrawInvite,
    component: <WithdrawInvitePage />
  }
]

export { orgManageContactsRoutes, orgManageContactsUrls, urlManageContactsAdd }
