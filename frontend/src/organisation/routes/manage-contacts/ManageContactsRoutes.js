import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'

const urlManageContactsOrg = 'organisation/manage-contacts'

const orManageContactsUrls = {
  add: {
    addNew: urlManageContactsOrg + '/add'
  }
}

const orManageContactsRoutes = [
  {
    path: orManageContactsUrls.add.addNew,
    component: <AddContactDetailsPage />
  }
]

export { orManageContactsRoutes, orManageContactsUrls }
