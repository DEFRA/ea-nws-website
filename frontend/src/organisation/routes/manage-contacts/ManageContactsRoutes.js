import AddContactChannelsPage from '../../pages/manage-contact/add-contact/AddContactChannelsPage'
import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'
import AddContactKeywordsPage from '../../pages/manage-contact/add-contact/AddContactKeywordsPage'
import AddContactNotesPage from '../../pages/manage-contact/add-contact/AddContactNotesPage'

const urlManageContactsOrg = '/organisation/manage-contacts'
const urlManageContactsAdd = urlManageContactsOrg + '/add'

const orgManageContactsUrls = {
  add: {
    details: urlManageContactsAdd,
    keywords: urlManageContactsAdd + '/keywords',
    channels: urlManageContactsAdd + '/channels',
    notes: urlManageContactsAdd + '/notes'
  }
}

const orgManageContactsRoutes = [
  {
    path: orgManageContactsUrls.add.details,
    component: <AddContactDetailsPage />
  },
  {
    path: orgManageContactsUrls.add.notes,
    component: <AddContactNotesPage />
  },
  {
    path: orgManageContactsUrls.add.channels,
    component: <AddContactChannelsPage />
  },
  {
    path: orgManageContactsUrls.add.keywords,
    component: <AddContactKeywordsPage />
  }
]

export { orgManageContactsRoutes, orgManageContactsUrls }
