import React from "react";
import StartPage from "../pages/StartPage";
import ContactDetailsPage from "../pages/ContactDetails/ContactDetailsPage";
import ConfirmDeleteContactDetailsPage from "../pages/ContactDetails/ConfirmDeleteContactDetailsPage";

//start routes
const startRoutes = [{ path: "/", component: <StartPage /> }];

//contact routes
const contactRoutes = [
  { path: "/managecontacts", component: <ContactDetailsPage /> },
  {
    path: "/managecontacts/confirm",
    component: <ConfirmDeleteContactDetailsPage />,
  },
];

const routes = [...startRoutes, ...contactRoutes];

export default routes;
