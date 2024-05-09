import React from "react";
import StartPage from "../pages/StartPage";
import SignOutManually from "../pages/SignOutManually";
import SignOutAutomatically from "../pages/SignOutAutomatically";
import SignBackIn from "../pages/SignBackIn";

//start routes
const startRoutes = [{ path: "/start", component: <StartPage /> }]

//contact routes
const contactRoutes = [
{
    path: "/signoutmanually", 
    component: <SignOutManually/>
},
{
    path: "/signoutautomatically",
    component: <SignOutAutomatically/>
},
{
    path:"/signbackin",
     component: <SignBackIn/>
}
];

const routes = [...startRoutes,...contactRoutes]

export default routes;
