import AddOrganisationAddressPage from '../../pages/registration/AddOrganisationAddressPage'
import AddOrganisationNamePage from '../../pages/registration/AddOrganisationNamePage'
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
  }
]

export default orgRegistrationRoutes
