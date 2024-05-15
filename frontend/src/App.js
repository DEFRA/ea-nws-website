import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import SignBackIn from "./pages/signOut/SignBackIn";
import userIsSigndout from "./services/CheckUserSignInService"


export default function App() {
  //remove bellow variable when not testing
  let userLoggedout = false //use this while running tests as allows access when account isnt created
  //uncomment bellow variable when not testing
  //let userLoggedout = userIsSigndout() // use  this for actual program
  
  console.log(userLoggedout)
  //this if statement may increase as non authentication needed pages are developed
  if ((userLoggedout === true) && (window.location.href !== "http://localhost:3000/Start" && window.location.href !== "http://localhost:3000/SignInPage")) {
    console.log(window.location.href)
    return <SignBackIn/>;
  }
  else{

  return (
    <BrowserRouter basename="/">
      <Routes>
        
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
        
      </Routes>
    </BrowserRouter>
  );
}
}