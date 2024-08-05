import AddOrganisationAddressPage from '../../pages/sign-up/AddOrganisationAddressPage'
import AddOrganisationNamePage from '../../pages/sign-up/AddOrganisationNamePage'

// registration
const orgRegistrationRoutes = [
  { path: '/organisation/register', component: <AddOrganisationNamePage /> },
  {
    path: '/organisation/register/address',
    component: <AddOrganisationAddressPage />
  }
]

export default orgRegistrationRoutes
