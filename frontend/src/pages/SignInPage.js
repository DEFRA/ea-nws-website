import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";
import { useState } from 'react';

const EmailForm = props =>{
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.emailAddress.value;
    if(!validateEmail(email)){
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    console.log("Email: ", email)
    sendEmail(email)
    event.target.reset()
    window.location.replace("CheckYourEmailPage")
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const sendEmail = (email) => {
    var raw = JSON.stringify({"email": email});
    fetch("http://localhost:3000/signIn", 
      {
        method: "POST",
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          "Content-Type": "application/json"
        },
        body: raw,
      })
      .then(response => {
        response.text()})
      .then(result =>  {
        try {
          result = JSON.parse(result)
        } 
        catch (error) {
          console.log("Error parsing JSON Response:", error)
        }
        console.log("Response: ", result)
        })
      .catch(error => console.log('error', error));    
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
      <button type="submit" class="govuk-button" data-module="govuk-button">
        Continue
      </button>            
    </div>
  </form>
  )
}

const sendEmail = props => {

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
