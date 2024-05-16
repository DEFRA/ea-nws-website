import React from "react";
import StartPage from "../pages/StartPage";
import SignInPage from "../pages/signIn/SignInStartPage";
import CheckYourEmailPage from "../pages/signIn/SignInValidatePage";
import InitialEmailRegistrationPage from "../pages/register/InitialEmailRegistrationPage";
import ValidateEmailForRegistration from "../pages/register/ValidateEmailForRegistration";

const routes = [
    { path: "/start", component: <StartPage /> },
    { path: "/SignInPage", component: <SignInPage /> },
    { path: "/CheckYourEmailPage", component: <CheckYourEmailPage /> },
    { path: "/register", component: <InitialEmailRegistrationPage /> },
    { path: "/ValidateEmailForRegistration", component: <ValidateEmailForRegistration /> },
];

export default routes;
