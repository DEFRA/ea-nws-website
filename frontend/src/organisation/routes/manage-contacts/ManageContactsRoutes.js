import AddContactChannelsPage from '../../pages/manage-contact/add-contact/AddContactChannelsPage'
import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'

const urlManageContactsOrg = '/organisation/manage-contacts'

const orgManageContactsUrls = {
  add: {
    details: urlManageContactsOrg + '/add',
    notes: urlManageContactsOrg + '/add/notes',
    channels: urlManageContactsOrg + '/add/channels'
  }
}

const orgManageContactsRoutes = [
  {
    path: orgManageContactsUrls.add.details,
    component: <AddContactDetailsPage />
  },
  {
    // TODO UPDATE
    path: orgManageContactsUrls.add.notes,
    component: null
  },
  {
    path: orgManageContactsUrls.add.channels,
    component: <AddContactChannelsPage />
  }
]

export { orgManageContactsRoutes, orgManageContactsUrls }
