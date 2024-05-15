import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import userIsSigndout from "./pages/signOut/checkUserSignIn"; 
import SignBackIn from "./pages/signOut/SignBackIn";



export default function App() {
  
  
  let userLoggedout = userIsSigndout()
  //for testing
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