import AccountDeleteConfirmPage from '../../pages/account/AccountDeleteConfirmPage'
import AccountDeletePage from '../../pages/account/AccountDeletePage'
import AccountPage from '../../pages/account/AccountPage'
import ChangeBusinessDetailsPage from '../../pages/account/ChangeBusinessDetailsPage'
import ChangeEmailPage from '../../pages/account/ChangeEmailPage'
import ChangeEmailValidationPage from '../../pages/account/ChangeEmailValidatePage'
import ChangeNamePage from '../../pages/account/ChangeNamePage'

// account
const accountRoutes = [
  { path: '/account', component: <AccountPage /> },
  {
    path: '/account/change-business-details',
    component: <ChangeBusinessDetailsPage />
  },
  { path: '/account/change-email', component: <ChangeEmailPage /> },
  {
    path: '/account/change-email/validate',
    component: <ChangeEmailValidationPage />
  },
  { path: '/account/change-name', component: <ChangeNamePage /> },
  { path: '/account/delete', component: <AccountDeletePage /> },
  { path: '/account/delete/confirm', component: <AccountDeleteConfirmPage /> }
]

export default accountRoutes
