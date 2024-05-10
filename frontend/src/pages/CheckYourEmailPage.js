import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";
import InsetText from "../gov-uk-components/InsetText";
import { useState } from 'react';

const userEmail = window.sessionStorage.getItem("userEmail")
const signInToken = window.sessionStorage.getItem("signInToken")
const SignInCodeForm = props =>{
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const code = event.target.code.value;
    if(code === ""){
      setErrorMessage("Enter code")
      return;
    }
    event.target.reset()
  }

  const checkCode = async (code) => {
    var raw = JSON.stringify({"signInToken": signInToken, "code": code});
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
      const authToken = responseData['authToken'];  
      console.log("authToken", authToken)
      console.log(responseData)
      // Assign the status code to isValid
      //validCode = authToken === 200? true: false;
    }
    catch (error) {
      console.log("ERROR: ", error);
    }
    return 200;
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <br></br>      <br></br>
      <button type="submit" class="govuk-button" data-module="govuk-button">
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
          <SignInCodeForm></SignInCodeForm>
        </div>
      </div>

      <Footer />
    </>
  );
}
