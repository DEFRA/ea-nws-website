import AdminInviteNotWorkingPage from '../../pages/manage-contact/add-admin/AdminInviteNotWorkingPage'
import AdminInvitePage from '../../pages/manage-contact/add-admin/AdminInvitePage'
import AdminJoinedPage from '../../pages/manage-contact/add-admin/AdminJoinedPage'
import AddContactChannelsPage from '../../pages/manage-contact/add-contact/AddContactChannelsPage'
import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'
import AddContactKeywordsPage from '../../pages/manage-contact/add-contact/AddContactKeywordsPage'
import AddContactNotesPage from '../../pages/manage-contact/add-contact/AddContactNotesPage'
import LinkContactToLocationPage from '../../pages/manage-contact/add-contact/LinkContactToLocationPage'
import DeleteContactPage from '../../pages/manage-contact/delete/DeleteContactPage'
import EditContactChannelsPage from '../../pages/manage-contact/edit-contact/EditContactChannelsPage'
import EditContactDetailsPage from '../../pages/manage-contact/edit-contact/EditContactDetailsPage'
import EditContactKeywordsPage from '../../pages/manage-contact/edit-contact/EditContactKeywordsPage'
import EditContactNotesPage from '../../pages/manage-contact/edit-contact/EditContactNotesPage'
import ViewContactsDashboardPage from '../../pages/manage-contact/view-contact/contacts-dashboard/ViewContactsDashboardPage'
import ContactInformationPage from '../../pages/manage-contact/view-contact/contacts-information/ContactInformationPage'
import LinkedLocationsPage from '../../pages/manage-contact/view-contact/contacts-information/LinkedLocationsPage'

const urlManageContactsOrg = '/organisation/manage-contacts'
const urlManageContactsAdd = urlManageContactsOrg + '/add'
const urlManageContactsEdit = urlManageContactsOrg + '/edit'
const urlManageContactsAdmin = urlManageContactsOrg + '/admin'

const orgManageContactsUrls = {
  add: {
    details: urlManageContactsAdd,
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
    invite: urlManageContactsAdmin + '/invite',
    invalidInvite: urlManageContactsAdmin + '/invite-invalid',
    joined: urlManageContactsAdmin + '/joined'
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
  // View
  {
    path: orgManageContactsUrls.view.dashboard,
    component: <ViewContactsDashboardPage />
  },
  {
    path: orgManageContactsUrls.view.viewContact,
    component: <ContactInformationPage />
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
  // Admin
  {
    path: orgManageContactsUrls.admin.invite,
    component: <AdminInvitePage />
  },
  {
    path: orgManageContactsUrls.admin.invalidInvite,
    component: <AdminInviteNotWorkingPage />
  },
  { path: orgManageContactsUrls.admin.joined, component: <AdminJoinedPage /> }
]

export { orgManageContactsRoutes, orgManageContactsUrls, urlManageContactsAdd }
