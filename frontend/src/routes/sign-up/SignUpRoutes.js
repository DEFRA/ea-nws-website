import AddFullNamePage from '../../pages/sign-up/account-name/AddFullNamePage'
import SignUpDuplicateEmailPage from '../../pages/sign-up/account/SignUpDuplicateEmail'
import SignUpFeedbackConfirmationPage from '../../pages/sign-up/account/SignUpFeedbackConfirmationPage'
import SignUpFeedbackPage from '../../pages/sign-up/account/SignUpFeedbackPage'
import SignUpPage from '../../pages/sign-up/account/SignUpPage'
import SignUpValidationPage from '../../pages/sign-up/account/SignUpValidationPage'
import WarningContactsPreferencePage from '../../pages/sign-up/channel-preferences/WarningContactsPreferencePage'
import AddLandlinePhonePage from '../../pages/sign-up/channel-preferences/landline-telephone-authentication/AddLandlinePhonePage'
import SkipConfirmLandlinePhonePage from '../../pages/sign-up/channel-preferences/landline-telephone-authentication/SkipConfirmLandlinePhonePage'
import ValidateLandlinePhonePage from '../../pages/sign-up/channel-preferences/landline-telephone-authentication/ValidateLandlinePhonePage'
import AddMobilePhonePage from '../../pages/sign-up/channel-preferences/mobile-telephone-authentication/AddMobilePhonePage'
import SkipConfirmMobilePhonePage from '../../pages/sign-up/channel-preferences/mobile-telephone-authentication/SkipConfirmMobilePhonePage'
import ValidateMobilePhonePage from '../../pages/sign-up/channel-preferences/mobile-telephone-authentication/ValidateMobilePhonePage'
import LocationInAlertAreaPage from '../../pages/sign-up/register-location/LocationInAlertAreaPage'
import LocationInSevereWarningAreaPage from '../../pages/sign-up/register-location/LocationInSevereWarningAreaPage'
import LocationInWarningAreaProximityPage from '../../pages/sign-up/register-location/LocationInWarningAreaProximityPage'
import LocationNotNearDangerPage from '../../pages/sign-up/register-location/LocationNotNearDangerPage'
import LocationSearchPage from '../../pages/sign-up/register-location/LocationSearchPage'
import LocationSearchResultsPage from '../../pages/sign-up/register-location/LocationSearchResultsPage'
import SignUpSuccessPage from '../../pages/sign-up/success/SignUpSuccessPage'
import DeclarationOfAgreementPage from '../../pages/sign-up/user-agreement/DeclarationOfAgreementPage'

// sign up routes
const signupRoutes = [
  { path: '/signup', component: <SignUpPage /> },
  {
    path: '/signup/validate',
    component: <SignUpValidationPage />
  },
  {
    path: '/signup/contactpreferences',
    component: <WarningContactsPreferencePage />
  },
  // register a location
  {
    path: '/signup/register-location/search',
    component: <LocationSearchPage />
  },
  {
    path: '/signup/register-location/search-results',
    component: <LocationSearchResultsPage />
  },
  {
    path: '/signup/register-location/location-in-proximity-area/:type',
    component: <LocationInWarningAreaProximityPage />
  },
  {
    path: '/signup/register-location/location-in-severe-warning-area',
    component: <LocationInSevereWarningAreaPage />
  },
  {
    path: '/signup/register-location/location-in-alert-area',
    component: <LocationInAlertAreaPage />
  },
  {
    path: '/signup/register-location/no-danger',
    component: <LocationNotNearDangerPage />
  },
  // mobile phone authentication route
  {
    path: '/signup/contactpreferences/mobile/add',
    component: <AddMobilePhonePage />
  },
  {
    path: '/signup/contactpreferences/mobile/validate',
    component: <ValidateMobilePhonePage />
  },
  {
    path: '/signup/contactpreferences/mobile/skipconfirmation',
    component: <SkipConfirmMobilePhonePage />
  },
  // landline authentication route
  {
    path: '/signup/contactpreferences/landline/add',
    component: <AddLandlinePhonePage />
  },
  {
    path: '/signup/contactpreferences/landline/validate',
    component: <ValidateLandlinePhonePage />
  },
  {
    path: '/signup/contactpreferences/landline/skipconfirmation',
    component: <SkipConfirmLandlinePhonePage />
  },
  { path: '/signup/accountname/add', component: <AddFullNamePage /> },
  {
    path: '/signup/feedback',
    component: <SignUpFeedbackPage />
  },
  {
    path: '/signup/feedback/confirmation',
    component: <SignUpFeedbackConfirmationPage />
  },
  {
    path: '/declaration',
    component: <DeclarationOfAgreementPage />
  },
  {
    path: '/signup/duplicate',
    component: <SignUpDuplicateEmailPage />
  },
  {
    path: '/signup/success',
    component: <SignUpSuccessPage />
  }
]

export default signupRoutes
