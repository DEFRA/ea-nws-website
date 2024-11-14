import AddContactDetailsPage from '../../pages/manage-contact/add-contact/AddContactDetailsPage'
import AddContactKeywordsPage from '../../pages/manage-contact/add-contact/AddContactKeywordsPage'
import ContactInformationPage from '../../pages/manage-contact/view-contact/ContactInformationPage'

const urlManageContactsOrg = '/organisation/manage-contacts'
const urlManageContactsAdd = urlManageContactsOrg + '/add'

const orgManageContactsUrls = {
  add: {
    details: urlManageContactsAdd,
    keywords: urlManageContactsAdd + '/keywords',
    channels: urlManageContactsAdd + '/channels'
  },
  view: {
    viewContact: urlManageContactsOrg + '/view-contact'
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
    // TODO update channels component
    component: null
  },
  {
    path: orgManageContactsUrls.view.viewContact,
    component: <ContactInformationPage />
  }
]

export { orgManageContactsRoutes, orgManageContactsUrls }
