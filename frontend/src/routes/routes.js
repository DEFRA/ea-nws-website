import React from 'react'
import Index from '../pages/Index'
import accountRoutes from './account/AccountRoutes'
import footerRoutes from './footer/FooterRoutes'
import homeRoutes from './home/HomeRoutes'
import manageContactRoutes from './manage-contacts/manageContactRoutes'
import signinRoutes from './sign-in/SignInRoutes'
import signOutRoutes from './sign-out/SignOutRoutes'
import signupRoutes from './sign-up/SignUpRoutes'
import startRoutes from './start/StartRoutes'

// index routes
const indexRoutes = [{ path: '/index', component: <Index /> }]

// start routes
const startRoutes = [{ path: '/', component: <StartPage /> }]

// sign in routes
const signinRoutes = [
  { path: '/signin', component: <SignInPage /> },
  { path: '/signin/validate', component: <SignInValidatePage /> }
]

// sign out routes
const signOutRoutes = [
  { path: '/signout-auto', component: <SignOutAutomaticallyPage /> },
  { path: '/signout', component: <SignOutManuallyPage /> }
]

const signBackInRoutes = [
  { path: '/sign-back-in', component: <SignBackInPage /> }
]
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

// footer routes
const footerRoutes = [
  { path: '/contact', component: <ContactUsPage /> },
  { path: '/privacy', component: <PrivacyNoticePage /> },
  { path: '/cookies', component: <CookiesPage /> },
  {
    path: '/accessibility-statement',
    component: <AccessibilityStatementPage />
  },
  { path: '/terms-and-conditions', component: <TermsAndConditionsPage /> }
]

// home
const homeRoutes = [{ path: '/home', component: <HomePage /> }]

// account
const accountRoutes = [
  { path: '/account', component: <AccountPage /> },
  {
    path: '/account/change-business-details',
    component: <ChangeBusinessDetailsPage />
  },
  { path: '/account/change-email', component: <ChangeEmailPage /> },
  {
    path: '/account/change-email/validate',
    component: <ChangeEmailValidationPage />
  },
  { path: '/account/change-name', component: <ChangeNamePage /> }
]

// contact routes
const contactRoutes = [
  { path: '/managecontacts', component: <ContactDetailsPage /> },
  {
    path: '/managecontacts/confirm-delete',
    component: <ConfirmDeleteContactDetailsPage />
  },
  { path: '/managecontacts/add-email', component: <AddEmailPage /> },
  {
    path: '/managecontacts/validate-email',
    component: <AddEmailValidatePage />
  },
  { path: '/managecontacts/add-mobile', component: <AddMobilePage /> },
  {
    path: '/managecontacts/validate-mobile',
    component: <AddMobileValidatePage />
  },
  { path: '/managecontacts/add-landline', component: <AddLandlinePage /> },
  {
    path: '/managecontacts/validate-landline',
    component: <AddLandlineValidatePage />
  }
]

export const routes = [
  ...indexRoutes,
  ...startRoutes,
  ...signupRoutes,
  ...signinRoutes,
  ...signupRoutes,
  ...footerRoutes
]

export const authenticatedRoutes = [
  ...homeRoutes,
  ...manageContactRoutes,
  ...signOutRoutes,
  ...accountRoutes
]
