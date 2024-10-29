//import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'
import AddContactKeywordsPage from '../../pages/manage-contacts/add-contacts/AddContactKeywordsPage'
const urlManageContactsOrg = 'organisation/manage-contacts'

const orgManageContactsUrls = {
  add: {
    addNew: urlManageContactsOrg + '/add',
    keywords: urlManageContactsOrg + '/add/keywords'
  }
}

const orgManageContactsRoutes = [
  /*{
    path: orManageContactsUrls.add.addNew,
    component: <AddContactDetailsPage />
  },*/
  {
    path: orgManageContactsUrls.add.keywords,
    component: <AddContactKeywordsPage />
  }
]

export { orgManageContactsRoutes, orgManageContactsUrls }
