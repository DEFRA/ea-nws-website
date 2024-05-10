import Header from "../../gov-uk-components/Header";
import Footer from "../../gov-uk-components/Footer";
import InsetText from "../../gov-uk-components/InsetText";
import { useState } from 'react';

const userEmail = window.sessionStorage.getItem("userEmail")
const signInToken = window.sessionStorage.getItem("signInToken")

const validateNumber = (input, digits) => {
  const numberPattern = new RegExp(`^[0-9]{${digits}}$`);
  return numberPattern.test(input);
};

const SignInValidateForm = props =>{
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const code = event.target.code.value;

    if(code === ""){
      setErrorMessage("Enter code")
      return;
    }
    if(!validateNumber(code, 6)){
      setErrorMessage("Code must be 6 numbers")
      return;
    }
    const apiReturn = await validateCode(code);
    if(!apiReturn){
      setErrorMessage("Invalid code")
      return;
    }
    event.target.reset()
    window.location.replace("Start")
  }

  const validateCode = async (code) => {
    var raw = JSON.stringify({"signinToken": signInToken, "code": code});
    let authToken;
    let profile;
    let registration;
    try{
      const response = await fetch("http://localhost:3000/signInValidate", 
      {
        method: "POST",
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          "Content-Type": "application/json"
        },
        body: raw,
      })
      const responseData = await response.json();
      console.log("ResponseData", responseData)
      if(responseData.hasOwnProperty('code')){
        return false
      }
      authToken = responseData['authToken'];  
      profile = responseData['profile']; 
      registration = responseData['registration']; 
    }
    catch (error) {
      console.log("ERROR: ", error);
    }
  
    window.sessionStorage.setItem("authToken", authToken)
    window.sessionStorage.setItem("profile", profile)
    window.sessionStorage.setItem("registration", registration)
    return true;
  }

  return (
  <form onSubmit={handleSubmit}>
    <div class="govuk-form-group">
      <label class="govuk-label" for="code">
        Enter code
      </label>
      <input 
        class="govuk-input govuk-input--width-20" 
        id="code" 
        name="code" 
        type="text"
      />
      <br></br>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit" class="govuk-button" data-module="govuk-button" style={{marginTop: '10px'}}>
        Continue
      </button>            
    </div>
  </form>
  )
}

export default function CheckYourEmailPage() {
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <a href="SignInPage" class="govuk-back-link">Back</a>
        <h2 class="govuk-heading-l">Check your email</h2>
        <div class="govuk-body">
          We've sent a code to:
          <InsetText text={userEmail}></InsetText>
          <SignInValidateForm></SignInValidateForm>
        </div>
      </div>

      <Footer />
    </>
  );
}
