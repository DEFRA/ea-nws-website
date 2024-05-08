import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";

export default function InitialEmailRegistrationPage() 
{

  function redirectUser(){
    console.log("redirecting user")
    window.location.replace("validateEmailForRegistration");
  }

  function getValueEmailAddress(){
    const email = document.getElementById('email-address').value;
    console.log("email value", email)
    //validateEmailForRegistration(email)
    registerUser(email);
  }

  function validateEmailForRegistration(email){
    console.log("front end email validation")
    const contains = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (contains.test(email) === false) 
    {
      alert("Invalid email")
      return false;
    }
    return true;
  }
  
  function registerUser(email){
      var raw = JSON.stringify({"email": email});
      console.log("email register user", email)
      fetch("http://localhost:3000/register", 
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
          try{
              return response.json().then(data => ({
                  data: data,
                  status: response.status
              }));
          } catch (error) {
              console.log("Error parsing JSON Response:", error)
              throw error;
          }})
          .then(res => {          
            console.log(res.status, res.data.message);
            redirectUser()
        })
        .catch(error => console.log("ERROR: ", error)); 
    }
    return (
      <>
        <Header />
        <div className="govuk-width-container">
        <a href="/" class="govuk-back-link" >Back</a>
          <h1 className="govuk-heading-xl">Manage your warnings</h1>
          <p className="govuk-body">Register by Email</p>
          
          <div className="govuk-form-group">
            <fieldset className="govuk-fieldset">
                <div className="govuk-form-group">
                    <label className="govuk-label" htmlFor="email-address">
                        Enter a valid email address for registration:
                    </label>
                    <input className="govuk-input govuk-!-width-one-half" id="email-address" name="email-address" type="email" onb spellCheck="false" autoComplete="email"></input>
                </div>
            </fieldset>
        </div>

        <button className="govuk-button" data-module="govuk-button" onClick={getValueEmailAddress}>
            Register
        </button>
        
        </div>
        <Footer />
      </>
    );
  }
