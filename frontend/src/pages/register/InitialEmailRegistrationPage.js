import Header from "../../gov-uk-components/Header";
import Footer from "../../gov-uk-components/Footer";
import TextInput from "../../gov-uk-components/TextInput";
import { useState } from 'react';
const backendCall = require('../../services/BackendService')

const EmailForm = props => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.emailAddress.value;

    if(email === ""){
      setErrorMessage("Enter your email address")
      return;
    }
    if(!validateEmail(email)){
      setErrorMessage("Enter an email address in the correct format, like name@example.com");
      return;
    }
    const emailExists = await checkEmail(email)
    if(emailExists === false){
      setErrorMessage("Email address is already in use");
      return;
    }

    window.sessionStorage.setItem("userEmail", email)
    event.target.reset()
    window.location.replace("ValidateEmailForRegistration")
    
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const checkEmail = async (email) => {
    console.log("email value",email)
    let registerToken = "";
    var raw = JSON.stringify({"email": email});
    const responseData = await backendCall(raw, "registerStart")
    console.log("response data", responseData)
    
    const code = responseData['code']; 
    console.log("code returned", code) 
    registerToken = responseData['registerToken'];  
    // Assign the status code to isValid
    if (code === 101){
      return false;
    }
    
    window.sessionStorage.setItem("registerToken", registerToken);
    console.log("register token", registerToken)
    return true;
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput name="Email address" id="emailAddress"></TextInput>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit" class="govuk-button" data-module="govuk-button" >
        Continue
      </button>   
    </form>
  )
}

export default function InitialEmailRegistrationPage() {
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <a href="Start" class="govuk-back-link">Back</a>
        <h2 class="govuk-heading-l">Register for your flood warning account</h2>
        <div class="govuk-body">
          <p>Enter a valid email address for registration</p>
          <EmailForm></EmailForm>
          <a href="SignInPage" class="govuk-link">Sign in if you already have an account</a>
        </div>
      </div>
      <Footer />
    </>
  );
}
