import React from "react";
import StartPage from "../pages/StartPage";
import SignInPage from "../pages/SignInPage";
import CheckYourEmailPage from "../pages/CheckYourEmailPage";

const routes = [
    { path: "/start", component: <StartPage /> },
    { path: "/SignInPage", component: <SignInPage /> },
    { path: "/CheckYourEmailPage", component: <CheckYourEmailPage /> },
];

export default routes;
