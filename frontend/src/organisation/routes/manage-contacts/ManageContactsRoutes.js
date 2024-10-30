import AddContactChannelsPage from '../../pages/manage-contact/add-contact/AddContactChannelsPage'
import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'

const urlManageContactsOrg = 'organisation/manage-contacts'

const orgManageContactsUrls = {
  add: {
    addNew: urlManageContactsOrg + '/add',
    channels: urlManageContactsOrg + '/add/channels'
  }
}

const orgManageContactsRoutes = [
  {
    path: orgManageContactsUrls.add.addNew,
    component: <AddContactDetailsPage />
  },
  {
    path: orgManageContactsUrls.add.channels,
    component: <AddContactChannelsPage />
  }
]

export { orgManageContactsRoutes, orgManageContactsUrls }
