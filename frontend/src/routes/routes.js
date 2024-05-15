import React from "react";
import StartPage from "../pages/StartPage";
import ContactDetailsPage from "../pages/ContactDetails/ContactDetailsPage";
import ConfirmDeleteContactDetailsPage from "../pages/ContactDetails/ConfirmDeleteContactDetailsPage";
import SignInPage from "../pages/signIn/SignInStartPage";
import CheckYourEmailPage from "../pages/signIn/SignInValidatePage";

//start routes
const startRoutes = [{ path: "/", component: <StartPage /> }];

//sign in routes
const siginRoutes = [
  { path: "/SignInPage", component: <SignInPage /> },
  { path: "/CheckYourEmailPage", component: <CheckYourEmailPage /> },
];

//contact routes
const contactRoutes = [
  { path: "/managecontacts", component: <ContactDetailsPage /> },
  {
    path: "/managecontacts/confirm",
    component: <ConfirmDeleteContactDetailsPage />,
  },
];

const routes = [...startRoutes, ...siginRoutes, ...contactRoutes];

export default routes;
