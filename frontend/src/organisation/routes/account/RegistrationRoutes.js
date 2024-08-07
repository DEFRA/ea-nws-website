import AddAddressPage from '../../pages/registration/AddAddressPage'
import AddNamePage from '../../pages/registration/AddNamePage'
import CompaniesHouseNumPage from '../../pages/registration/CompaniesHouseNumPage'
import ConfirmAddressPage from '../../pages/registration/ConfirmAddressPage'
import SectorPage from '../../pages/registration/SectorPage'
import SelectAddressPage from '../../pages/registration/SelectAddressPage'

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
  }
]

export default registrationRoutes
