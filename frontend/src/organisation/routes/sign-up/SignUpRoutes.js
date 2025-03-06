import AddAddressPage from '../../pages/sign-up/AddAddressPage'
import AddNamePage from '../../pages/sign-up/AddNamePage'
import AlternativeContactDetailsPage from '../../pages/sign-up/AlternativeContactDetailsPage'
import CompaniesHouseNumPage from '../../pages/sign-up/CompaniesHouseNumPage'
import ConfirmAddressPage from '../../pages/sign-up/ConfirmAddressPage'
import DuplicateNamePage from '../../pages/sign-up/DuplicateNamePage'
import AdminDetailsPage from '../../pages/sign-up/mainAdministrator/AdminDetailsPage'
import DuplicateAdminEmailPage from '../../pages/sign-up/mainAdministrator/DuplicateAdminEmailPage'
import MainAdminPage from '../../pages/sign-up/mainAdministrator/MainAdminPage'
import ValidateAdminEmailPage from '../../pages/sign-up/mainAdministrator/ValidateAdminEmailPage'
import CheckYourAnswersPage from '../../pages/sign-up/review/CheckYourAnswersPage'
import SelectAddressPage from '../../pages/sign-up/SearchAddressResultPage'
import SectorPage from '../../pages/sign-up/SectorPage'
import SignUpSuccessPage from '../../pages/sign-up/success/SignUpSuccessPage'
import TermsAndConditionsPage from '../../pages/sign-up/TermsAndConditionsPage'

const orgSignUpUrl = '/organisation/sign-up'

const orgSignUpUrls = {
  signUp: orgSignUpUrl,
  address: {
    add: orgSignUpUrl + '/address',
    select: orgSignUpUrl + '/address-search',
    confirm: orgSignUpUrl + '/address-confirm'
  },
  compHouseNum: orgSignUpUrl + '/number',
  sector: orgSignUpUrl + '/sector',
  admin: {
    mainAdmin: orgSignUpUrl + '/main-admin',
    details: orgSignUpUrl + '/admin-details',
    confirmEmail: orgSignUpUrl + '/admin-email-confirm',
    duplicateEmail: orgSignUpUrl + '/admin-email-duplicate'
  },
  altContact: orgSignUpUrl + '/alternative-contact',
  duplicateOrgName: orgSignUpUrl + '/duplicate',
  success: orgSignUpUrl + '/success',
  review: orgSignUpUrl + '/review',
  termsAndConditions: orgSignUpUrl + '/declaration'
}

const orgSignUpRoutes = [
  { path: orgSignUpUrls.signUp, component: <AddNamePage /> },
  {
    path: orgSignUpUrls.address.add,
    component: <AddAddressPage />
  },
  {
    path: orgSignUpUrls.address.select,
    component: <SelectAddressPage />
  },
  {
    path: orgSignUpUrls.address.confirm,
    component: <ConfirmAddressPage />
  },
  {
    path: orgSignUpUrls.compHouseNum,
    component: <CompaniesHouseNumPage />
  },
  {
    path: orgSignUpUrls.sector,
    component: <SectorPage />
  },
  {
    path: orgSignUpUrls.admin.mainAdmin,
    component: <MainAdminPage />
  },
  {
    path: orgSignUpUrls.admin.details,
    component: <AdminDetailsPage />
  },
  {
    path: orgSignUpUrls.admin.confirmEmail,
    component: <ValidateAdminEmailPage />
  },
  {
    path: orgSignUpUrls.admin.duplicateEmail,
    component: <DuplicateAdminEmailPage />
  },
  {
    path: orgSignUpUrls.altContact,
    component: <AlternativeContactDetailsPage />
  },
  {
    path: orgSignUpUrls.success,
    component: <SignUpSuccessPage />
  },
  {
    path: orgSignUpUrls.duplicateOrgName,
    component: <DuplicateNamePage />
  },
  { path: orgSignUpUrls.review, component: <CheckYourAnswersPage /> },
  {
    path: orgSignUpUrls.termsAndConditions,
    component: <TermsAndConditionsPage />
  }
]

export { orgSignUpRoutes, orgSignUpUrls }
