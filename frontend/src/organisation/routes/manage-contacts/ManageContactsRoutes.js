import AddContactChannelsPage from '../../pages/manage-contact/add-contact/AddContactChannelsPage'
import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'
import AddContactKeywordsPage from '../../pages/manage-contact/add-contact/AddContactKeywordsPage'
import AddContactNotesPage from '../../pages/manage-contact/add-contact/AddContactNotesPage'
import ViewContactsDashboardPage from '../../pages/manage-contact/view-contact/contacts-dashboard/ViewContactsDashboardPage'
import ContactInformationPage from '../../pages/manage-contact/view-contact/contacts-information/ContactInformationPage'
import EditContactChannelsPage from '../../pages/manage-contact/edit-contact/EditContactCahnnelsPage'
import { path } from 'd3'

const urlManageContactsOrg = '/organisation/manage-contacts'
const urlManageContactsAdd = urlManageContactsOrg + '/add'
const urlManageContactsEdit = urlManageContactsOrg + '/edit'

const orgManageContactsUrls = {
  add: {
    details: urlManageContactsAdd,
    keywords: urlManageContactsAdd + '/keywords',
    channels: urlManageContactsAdd + '/channels',
    notes: urlManageContactsAdd + '/notes'
  },
  view: {
    dashboard: urlManageContactsOrg + '/view-contacts',
    viewContact: urlManageContactsOrg + '/view-contacts/view'
  },
  edit: {
    channels: urlManageContactsEdit +'/channels'
  }
}

const orgManageContactsRoutes = [
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
    path: orgManageContactsUrls.view.dashboard,
    component: <ViewContactsDashboardPage />
  },
  {
    path: orgManageContactsUrls.view.viewContact,
    component: <ContactInformationPage />
  },
  {
    path: orgManageContactsUrls.edit.channels,
    component: <EditContactChannelsPage/>
  }
]

export { orgManageContactsRoutes, orgManageContactsUrls, urlManageContactsAdd }
