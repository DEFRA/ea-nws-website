import React from "react";
import StartPage from "../pages/StartPage";
import SignOutManually from "../pages/SignOutManually";
import SignOutAutomatically from "../pages/SignOutAutomatically";
import SignBackIn from "../pages/SignBackIn";

const routes = [{ path: "/start", component: <StartPage /> },
{path: "/signoutmanually", component: <SignOutManually/>},
{path: "/signoutautomatically", component: <SignOutAutomatically/>},
{path:"/signbackin", component: <SignBackIn/>}];

export default routes;
