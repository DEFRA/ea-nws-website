import React from 'react'
import Index from '../pages/Index'
import ConfirmDeleteContactDetailsPage from '../pages/contact-details/ConfirmDeleteContactDetailsPage'
import ContactDetailsPage from '../pages/contact-details/ContactDetailsPage'
import AddEmailPage from '../pages/contact-details/add-contact-email/AddEmailPage'
import AddEmailValidatePage from '../pages/contact-details/add-contact-email/AddEmailValidatePage'
import AddLandlinePage from '../pages/contact-details/add-contact-landline/AddLandlinePage'
import AddLandlineValidatePage from '../pages/contact-details/add-contact-landline/AddLandlineValidatePage'
import AddMobilePage from '../pages/contact-details/add-contact-mobile/AddMobilePage'
import AddMobileValidatePage from '../pages/contact-details/add-contact-mobile/AddMobileValidatePage'
import HomePage from '../pages/home/HomePage'
import SignOutManuallyPage from '../pages/sign-out/SignOutManuallyPage'
import SignBackInPage from '../pages/sign-out/signBackInPage'
import SignOutAutomaticallyPage from '../pages/sign-out/signOutAutomaticallyPage'
import AddFullNamePage from '../pages/signup/account-name/AddFullNamePage'
import SignInPage from '../pages/signIn/SignInStartPage'
import SignInValidatePage from '../pages/signIn/SignInValidatePage'
import SignUpDuplicateEmailPage from '../pages/signup/account/SignUpDuplicateEmail'
import SignUpFeedbackPage from '../pages/signup/account/SignUpFeedbackPage'
import SignUpPage from '../pages/signup/account/SignUpPage'
import SignUpValidationPage from '../pages/signup/account/SignUpValidationPage'
import WarningContactsPreferencePage from '../pages/signup/channel-preferences/WarningContactsPreferencePage'
import AddLandlinePhonePage from '../pages/signup/channel-preferences/landline-telephone-authentication/AddLandlinePhonePage'
import SkipConfirmLandlinePhonePage from '../pages/signup/channel-preferences/landline-telephone-authentication/SkipConfirmLandlinePhonePage'
import ValidateLandlinePhonePage from '../pages/signup/channel-preferences/landline-telephone-authentication/ValidateLandlinePhonePage'
import AddMobilePhonePage from '../pages/signup/channel-preferences/mobile-telephone-authentication/AddMobilePhonePage'
import SkipConfirmMobilePhonePage from '../pages/signup/channel-preferences/mobile-telephone-authentication/SkipConfirmMobilePhonePage'
import ValidateMobilePhonePage from '../pages/signup/channel-preferences/mobile-telephone-authentication/ValidateMobilePhonePage'
import CheckYourAnswersPage from '../pages/signup/review/CheckYourAnswersPage'
import SelectContactTypeToAddPage from '../pages/signup/review/add-contact/SelectContactTypeToAddPage'
import AddEmailContactStartPage from '../pages/signup/review/add-contact/add-email-contact/AddContactEmailStartPage'
import ValidateEmailContactPage from '../pages/signup/review/add-contact/add-email-contact/AddContactEmailValidatePage'
import AddLandlineContactPage from '../pages/signup/review/add-contact/add-landline-contact/AddContactLandlineStartPage'
import ValidateLandlineContactPage from '../pages/signup/review/add-contact/add-landline-contact/AddContactLandlineValidatePage'
import AddMobileContactStartPage from '../pages/signup/review/add-contact/add-mobile-contact/AddContactMobileStartPage'
import ValidateMobileContactPage from '../pages/signup/review/add-contact/add-mobile-contact/AddContactMobileValidatePage'
import DeclarationOfAgreementPage from '../pages/signup/user-agreement/DeclarationOfAgreementPage'
import StartPage from '../pages/start/StartPage'

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
    path: '/signup/review',
    component: <CheckYourAnswersPage />
  },
  {
    path: '/signup/review/addcontact',
    component: <SelectContactTypeToAddPage />
  },
  {
    path: '/signup/review/add-landline',
    component: <AddLandlineContactPage />
  },
  {
    path: '/signup/review/validate-landline',
    component: <ValidateLandlineContactPage />
  },
  {
    path: '/signup/review/add-mobile',
    component: <AddMobileContactStartPage />
  },
  {
    path: '/signup/review/validate-mobile',
    component: <ValidateMobileContactPage />
  },
  {
    path: '/signup/review/add-email',
    component: <AddEmailContactStartPage />
  },
  {
    path: '/signup/review/validate-email',
    component: <ValidateEmailContactPage />
  },
]

// home
const homeRoutes = [{ path: '/home', component: <HomePage /> }]

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
  ...signBackInRoutes
]

export const authenticatedRoutes = [
  ...homeRoutes,
  ...contactRoutes,
  ...signOutRoutes
]
