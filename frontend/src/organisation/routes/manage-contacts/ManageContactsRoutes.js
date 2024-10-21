import AddNewContactPage from '../../pages/manage-contact/add-contact/AddNewContactPage'

const urlManageContactsOrg = 'organisation/manage-contacts'

const orManageContactsUrls = {
  add: {
    addNew: urlManageContactsOrg + '/add'
  }
}

const orManageContactsRoutes = [
  {
    path: orManageContactsUrls.add.addNew,
    component: <AddNewContactPage />
  }
]

export { orManageContactsRoutes, orManageContactsUrls }
