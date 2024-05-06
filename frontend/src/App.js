import StartPage from "./pages/StartPage";
import React from 'react';
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import CheckYourEmailPage from "./pages/CheckYourEmailPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<StartPage/>}/>
        <Route path="/SignInPage" element={<SignInPage/>}/>
        <Route path="/CheckYourEmailPage" element={<CheckYourEmailPage/>}/>
      </Routes>
    </>
  );
}
