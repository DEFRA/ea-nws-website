import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'
import AddContactNotesPage from '../../pages/manage-contact/add-contact/AddContactNotesPage'

const urlManageContactsOrg = '/organisation/manage-contacts'

const orgManageContactsUrls = {
  add: {
    addNew: urlManageContactsOrg + '/add',
    notes: urlManageContactsOrg + '/add/notes'
  }
}

const orgManageContactsRoutes = [
  {
    path: orgManageContactsUrls.add.addNew,
    component: <AddContactDetailsPage />
  },
  {
    path: orgManageContactsUrls.add.notes,
    component: <AddContactNotesPage />
  }
]

export { orgManageContactsRoutes, orgManageContactsUrls }
