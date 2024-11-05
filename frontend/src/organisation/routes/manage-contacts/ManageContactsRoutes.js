import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'

const urlManageContactsOrg = 'organisation/manage-contacts'

const orgManageContactsUrls = {
  add: {
    addNew: urlManageContactsOrg + '/add'
  }
}

const orgManageContactsRoutes = [
  {
    path: orgManageContactsUrls.add.addNew,
    component: <AddContactDetailsPage />
  }
]

export { orgManageContactsRoutes, orgManageContactsUrls }
