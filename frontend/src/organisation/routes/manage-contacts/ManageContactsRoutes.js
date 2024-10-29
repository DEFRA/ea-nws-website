//import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'
import AddContactKeywordsPage from '../../pages/manage-contacts/add-contacts/AddContactKeywordsPage'
const urlManageContactsOrg = 'organisation/manage-contacts'

const orManageContactsUrls = {
  add: {
    addNew: urlManageContactsOrg + '/add',
    keywords: urlManageContactsOrg + '/add/keywords'
  }
}

const orManageContactsRoutes = [
  /*{
    path: orManageContactsUrls.add.addNew,
    component: <AddContactDetailsPage />
  },*/
  {
    path: orManageContactsUrls.add.keywords,
    component: <AddContactKeywordsPage />
  }
]

export { orManageContactsRoutes, orManageContactsUrls }
