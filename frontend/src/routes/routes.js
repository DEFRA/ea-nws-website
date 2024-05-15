import React from "react";
import StartPage from "../pages/StartPage";
import SignInPage from "../pages/signIn/SignInStartPage";
import CheckYourEmailPage from "../pages/signIn/SignInValidatePage";

const routes = [
    { path: "/start", component: <StartPage /> },
    { path: "/SignInPage", component: <SignInPage /> },
    { path: "/CheckYourEmailPage", component: <CheckYourEmailPage /> },
];

export default routes;
