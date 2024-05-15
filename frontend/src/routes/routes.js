import React from "react";
import StartPage from "../pages/StartPage";
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
    path: "/SignOutManually", 
    component: <SignOutManually/>
},
{
    path: "/SignOutAutomatically",
    component: <SignOutAutomatically/>
},
{
    path:"/SignBackIn",
     component: <SignBackIn/>

},

{   path: "/Start",
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
