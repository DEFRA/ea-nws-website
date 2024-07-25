import ConfirmDeleteContactDetailsPage from '../../pages/manage-contacts/ConfirmDeleteContactDetailsPage'
import ManageContactsPage from '../../pages/manage-contacts/ManageContactsPage'
import AddEmailPage from '../../pages/manage-contacts/add-contact-email/AddEmailPage'
import ValidateEmailPage from '../../pages/manage-contacts/add-contact-email/ValidateEmailPage'
import AddLandlinePhonePage from '../../pages/manage-contacts/add-contact-landline/AddLandlinePhonePage'
import ValidateLandlinePhonePage from '../../pages/manage-contacts/add-contact-landline/ValidateLandlinePhonePage'
import AddMobilePhonePage from '../../pages/manage-contacts/add-contact-mobile/AddMobilePhonePage'
import ValidateMobilePhonePage from '../../pages/manage-contacts/add-contact-mobile/ValidateMobilePhonePage'

// contact routes
const manageContactRoutes = [
  { path: '/managecontacts', component: <ManageContactsPage /> },
  {
    path: '/managecontacts/confirm-delete',
    component: <ConfirmDeleteContactDetailsPage />
  },
  { path: '/managecontacts/add-email', component: <AddEmailPage /> },
  {
    path: '/managecontacts/validate-email',
    component: <ValidateEmailPage />
  },
  { path: '/managecontacts/add-mobile', component: <AddMobilePhonePage /> },
  {
    path: '/managecontacts/validate-mobile',
    component: <ValidateMobilePhonePage />
  },
  { path: '/managecontacts/add-landline', component: <AddLandlinePhonePage /> },
  {
    path: '/managecontacts/validate-landline',
    component: <ValidateLandlinePhonePage />
  }
]

export default manageContactRoutes
