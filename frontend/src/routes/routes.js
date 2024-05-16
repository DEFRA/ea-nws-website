import React from "react";
import StartPage from "../pages/StartPage";
import SignInStart from "../pages/signIn/SignInStartPage";
import SignInValidate from "../pages/signIn/SignInValidatePage";
import InitialEmailRegistrationPage from "../pages/register/InitialEmailRegistrationPage";
import ValidateEmailForRegistration from "../pages/register/ValidateEmailForRegistration";

const routes = [
  { path: "/start", component: <StartPage /> },
  { path: "/SignInStart", component: <SignInStart /> },
  { path: "/SignInValidate", component: <SignInValidate /> },
  { path: "/register", component: <InitialEmailRegistrationPage /> },
  {
    path: "/ValidateEmailForRegistration",
    component: <ValidateEmailForRegistration />,
  },
];

export default routes;
