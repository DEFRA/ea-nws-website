import AddAddressPage from '../../pages/sign-up/AddAddressPage'
import AddNamePage from '../../pages/sign-up/AddNamePage'
import AlternativeContactDetailsPage from '../../pages/sign-up/AlternativeContactDetailsPage'
import CompaniesHouseNumPage from '../../pages/sign-up/CompaniesHouseNumPage'
import ConfirmAddressPage from '../../pages/sign-up/ConfirmAddressPage'
import DuplicateNamePage from '../../pages/sign-up/DuplicateNamePage'
import SelectAddressPage from '../../pages/sign-up/SearchAddressResultPage'
import SectorPage from '../../pages/sign-up/SectorPage'
import AdminDetailsPage from '../../pages/sign-up/mainAdministrator/AdminDetailsPage'
import DuplicateAdminEmailPage from '../../pages/sign-up/mainAdministrator/DuplicateAdminEmailPage'
import MainAdminPage from '../../pages/sign-up/mainAdministrator/MainAdminPage'
import ValidateAdminEmailPage from '../../pages/sign-up/mainAdministrator/ValidateAdminEmailPage'
import CheckYourAnswersPage from '../../pages/sign-up/review/CheckYourAnswersPage'
import SignUpSuccessPage from '../../pages/sign-up/success/SignUpSuccessPage'
import DeclarationOfAgreement from '../../pages/sign-up/DeclarationOfAgreementPage'

const urlSignUpOrg = '/organisation/sign-up'

// registration
const signupRoutes = [
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
  },
  {
    path: urlSignUpOrg + '/admin-email-duplicate',
    component: <DuplicateAdminEmailPage />
  },
  {
    path: urlSignUpOrg + '/success',
    component: <SignUpSuccessPage />
  },
  {
    path: urlSignUpOrg + '/duplicate',
    component: <DuplicateNamePage />
  },
  { path: urlSignUpOrg + '/review', component: <CheckYourAnswersPage /> },
  {
    path: urlSignUpOrg + '/declaration',
    component: <DeclarationOfAgreement />
  }
]

export default signupRoutes
