import AddOrganisationAddressPage from '../../pages/registration/AddOrganisationAddressPage'
import AddOrganisationNamePage from '../../pages/registration/AddOrganisationNamePage'
import ConfirmOrganisationAddressPage from '../../pages/registration/ConfirmOrganisationAddressPage'
import SelectOrganisationAddressPage from '../../pages/registration/SelectOrganisationAddressPage'

// registration
const orgRegistrationRoutes = [
  { path: '/organisation/register', component: <AddOrganisationNamePage /> },
  {
    path: '/organisation/register/address',
    component: <AddOrganisationAddressPage />
  },
  {
    path: '/organisation/register/address-search',
    component: <SelectOrganisationAddressPage />
  },
  {
    path: '/organisation/register/address-confirm',
    component: <ConfirmOrganisationAddressPage />
  }
]

export default orgRegistrationRoutes
