import AddOrganisationAddressPage from '../../pages/registration/AddOrganisationAddressPage'
import AddOrganisationNamePage from '../../pages/registration/AddOrganisationNamePage'
import ConfirmOrganisationAddressPage from '../../pages/registration/ConfirmOrganisationAddressPage'
import OrganisationCompaniesHouseNumPage from '../../pages/registration/OrganisationCompaniesHouseNumPage'
import OrganisationSectorPage from '../../pages/registration/OrganisationSectorPage'
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
  },
  {
    path: '/organisation/register/number',
    component: <OrganisationCompaniesHouseNumPage />
  },
  {
    path: '/organisation/register/sector',
    component: <OrganisationSectorPage />
  }
]

export default orgRegistrationRoutes
