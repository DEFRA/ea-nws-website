import React from "react";
import StartPage from "../pages/signOut/StartPage";
import SignOutManually from "../pages/signOut/SignOutManually";
import SignOutAutomatically from "../pages/signOut/SignOutAutomatically";
import SignBackIn from "../pages/signOut/SignBackIn";
import SignInPage from "../pages/signIn/SignInStartPage";
import CheckYourEmailPage from "../pages/signIn/SignInValidatePage";

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

},

{   path: "/start",
    component: <StartPage /> 
},
{ 
    path: "/SignInPage", 
    component: <SignInPage /> 
},
{   
    path: "/CheckYourEmailPage",
     component: <CheckYourEmailPage /> 
}

];

const routes = [...startRoutes,...contactRoutes]



    

export default routes;
