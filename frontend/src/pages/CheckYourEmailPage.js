import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";
import InsetText from "../gov-uk-components/InsetText";
import { useState } from 'react';

const userEmail = window.sessionStorage.getItem("userEmail")
const SignInCodeForm = props =>{
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const code = event.target.code.value;
    /*const emailExists = await checkEmail(email)
    if(!emailExists){
      setErrorMessage("Email address is not recognised - check and try again");
      return;
    }*/
    if(code === ""){
      setErrorMessage("Enter code")
      return;
    }
    event.target.reset()
  }

  const checkCode = async (code) => {
    let validCode = false;
    var raw = JSON.stringify({"code": validCode});
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
      const statusCode = responseData['code'];  
      console.log("StatusCode", statusCode)
      console.log("StatusCodeType", typeof statusCode)
      console.log(responseData)
      // Assign the status code to isValid
      validCode = statusCode === 200? true: false;
    }
    catch (error) {
      console.log("ERROR: ", error);
    }
    return validCode;
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
