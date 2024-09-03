import AddAddressPage from '../../pages/registration/AddAddressPage'
import AddNamePage from '../../pages/registration/AddNamePage'
import AlternativeContactDetailsPage from '../../pages/registration/AlternativeContactDetailsPage'
import CompaniesHouseNumPage from '../../pages/registration/CompaniesHouseNumPage'
import ConfirmAddressPage from '../../pages/registration/ConfirmAddressPage'
import AdminDetailsPage from '../../pages/registration/mainAdministrator/AdminDetailsPage'
import DuplicateAdminEmailPage from '../../pages/registration/mainAdministrator/DuplicateAdminEmailPage'
import MainAdminPage from '../../pages/registration/mainAdministrator/MainAdminPage'
import ValidateAdminEmailPage from '../../pages/registration/mainAdministrator/ValidateAdminEmailPage'
import SelectAddressPage from '../../pages/registration/SearchAddressResultPage'
import SectorPage from '../../pages/registration/SectorPage'

// registration
const registrationRoutes = [
  { path: '/organisation/register', component: <AddNamePage /> },
  {
    path: '/organisation/register/address',
    component: <AddAddressPage />
  },
  {
    path: '/organisation/register/address-search',
    component: <SelectAddressPage />
  },
  {
    path: '/organisation/register/address-confirm',
    component: <ConfirmAddressPage />
  },
  {
    path: '/organisation/register/number',
    component: <CompaniesHouseNumPage />
  },
  {
    path: '/organisation/register/sector',
    component: <SectorPage />
  },
  {
    path: '/organisation/register/main-admin',
    component: <MainAdminPage />
  },
  {
    path: '/organisation/register/admin-details',
    component: <AdminDetailsPage />
  },
  {
    path: '/organisation/register/admin-email-confirm',
    component: <ValidateAdminEmailPage />
  },
  {
    path: '/organisation/register/alternative-contact',
    component: <AlternativeContactDetailsPage />
  },
  {
    path: '/organisation/register/admin-email-duplicate',
    component: <DuplicateAdminEmailPage />
  }
]

export default registrationRoutes
