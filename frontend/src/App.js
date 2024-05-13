import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import userIsSigndout from "./pages/signOut/checkUserSignIn"; 
import SignBackIn from "./pages/signOut/SignBackIn";



export default function App() {
  const test_var = false
  // bug here for not working on what pages to render
  if (userIsSigndout === true && (routes.path !== "/start") && (routes.path !== "/signinpage") && (routes.path !== "checkyouremailpage")) {
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