import AddAddressPage from '../../pages/registration/AddAddressPage'
import AddNamePage from '../../pages/registration/AddNamePage'
import AdminDetailsPage from '../../pages/registration/AdminDetailsPage'
import CompaniesHouseNumPage from '../../pages/registration/CompaniesHouseNumPage'
import ConfirmAddressPage from '../../pages/registration/ConfirmAddressPage'
import MainAdminPage from '../../pages/registration/MainAdminPage'
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
  }
]

export default registrationRoutes
