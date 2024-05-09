import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";
import { useState } from 'react';

const EmailForm = props =>{
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.emailAddress.value;
    const emailExists = await checkEmail(email)
    if(!validateEmail(email)){
      setErrorMessage("Enter an email address in the correct format, like name@example.com");
      return;
    }
    if(!emailExists){
      setErrorMessage("Email address is not recognised - check and try again");
      return;
    }
    if(email === ""){
      setErrorMessage("Enter your email address")
      return;
    }
    window.sessionStorage.setItem("userEmail", email)
    event.target.reset()
    window.location.replace("CheckYourEmailPage")
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const checkEmail = async (email) => {
    let emailExists = false;
    let signInToken = "";
    var raw = JSON.stringify({"email": email});
    try{
      const response = await fetch("http://localhost:3000/signInStart", 
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
      const statusCode = responseData['statusCode'];  
      signInToken = responseData['signInToken'];  
      // Assign the status code to isValid
      emailExists = statusCode === 200? true: false;
    }
    catch (error) {

      console.log("ERROR: ", error);
    }
    window.sessionStorage.setItem("signInToken", signInToken)
    return emailExists;
  }

  return (
  <form onSubmit={handleSubmit}>
    <div class="govuk-form-group">
      <label class="govuk-label" for="email-address">
        Email address
      </label>
      <input 
        class="govuk-input govuk-input--width-20" 
        id="email-address" 
        name="emailAddress" 
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



export default function SignInPage() {
  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <a href="StartPage" class="govuk-back-link">Back</a>
        <h2 class="govuk-heading-l">Sign in to your flood warnings account</h2>
        <div class="govuk-body">
          You can:
          <ul class="govuk-list govuk-list--bullet">
            <li>update or remove your locations</li>
            <li>change how you get flood messages</li>
            <li>delete your account</li>
          </ul>
          <EmailForm></EmailForm>
          <a href="#" class="govuk-link">Sign up if you do not have an account</a>
        </div>
      </div>
      <Footer />
    </>
  );
}
