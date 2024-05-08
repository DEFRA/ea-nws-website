import InitialEmailRegistrationPage from "./pages/InitialEmailRegistrationPage";
import StartPage from "./pages/StartPage";
import ValidateEmailForRegistration from "./pages/ValidateEmailForRegistration"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter basename="">
    <Routes>
      <Route path="startreact" element={<StartPage />}></Route>
      <Route path="register" element={<InitialEmailRegistrationPage />}></Route>
      <Route path="validateEmailForRegistration" element={<ValidateEmailForRegistration />}></Route>
    </Routes>
  </BrowserRouter>
  );
}
