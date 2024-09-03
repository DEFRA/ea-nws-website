import AddAddressPage from '../../pages/registration/AddAddressPage'
import AddNamePage from '../../pages/registration/AddNamePage'
import AlternativeContactDetailsPage from '../../pages/registration/AlternativeContactDetailsPage'
import CompaniesHouseNumPage from '../../pages/registration/CompaniesHouseNumPage'
import ConfirmAddressPage from '../../pages/registration/ConfirmAddressPage'
import AdminDetailsPage from '../../pages/registration/mainAdministrator/AdminDetailsPage'
import MainAdminPage from '../../pages/registration/mainAdministrator/MainAdminPage'
import ValidateAdminEmailPage from '../../pages/registration/mainAdministrator/ValidateAdminEmailPage'
import SelectAddressPage from '../../pages/registration/SearchAddressResultPage'
import SectorPage from '../../pages/registration/SectorPage'

const urlSignUpOrg = '/organisation/sign-up'

// registration
const registrationRoutes = [
  { path: urlSignUpOrg, component: <AddNamePage /> },
  {
    path: urlSignUpOrg + '/address',
    component: <AddAddressPage />
  },
  {
    path: urlSignUpOrg + '/address-search',
    component: <SelectAddressPage />
  },
  {
    path: urlSignUpOrg + '/address-confirm',
    component: <ConfirmAddressPage />
  },
  {
    path: urlSignUpOrg + '/number',
    component: <CompaniesHouseNumPage />
  },
  {
    path: urlSignUpOrg + '/sector',
    component: <SectorPage />
  },
  {
    path: urlSignUpOrg + '/main-admin',
    component: <MainAdminPage />
  },
  {
    path: urlSignUpOrg + '/admin-details',
    component: <AdminDetailsPage />
  },
  {
    path: urlSignUpOrg + '/admin-email-confirm',
    component: <ValidateAdminEmailPage />
  },
  {
    path: urlSignUpOrg + '/alternative-contact',
    component: <AlternativeContactDetailsPage />
  }
]

export default registrationRoutes
