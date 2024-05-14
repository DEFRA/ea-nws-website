import TextInput from "../../gov-uk-components/TextInput";

const backendCall = require('../../services/BackendService')

const EmailForm = ({ errorList, setErrorList }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.emailAddress.value;
    let errors = []
    if (email === "") {
        errors.push("Enter your email address");
      return;
    }
    if (!validateEmail(email)) {
        errors.push("Enter an email address in the correct format, like name@example.com");
      return;
    }
    const emailExists = await checkEmail(email);
    if (!emailExists) {
        errors.push("Email address is not recognised - check and try again");
      return;
    }
    if(errors.length > 0){        
        setErrorList(errors);
        return;
    }
    window.sessionStorage.setItem("userEmail", email);
    event.target.reset();
    window.location.replace("CheckYourEmailPage");
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const checkEmail = async (email) => {
    let signInToken = "";
    var raw = JSON.stringify({ "email": email });
    const responseData = await backendCall(raw, "signInStart");
    if (responseData === undefined) {
      return false;
    }
    const code = responseData['code'];
    signInToken = responseData['signInToken'];
    if (code === 101) {
      return false;
    }
    window.sessionStorage.setItem("signInToken", signInToken);
    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput name="Email address" id="emailAddress"></TextInput>
      {errorList && <p style={{ color: 'red' }} id="errorMessage">{errorList[0]}</p>}
      <button type="submit" className="govuk-button" data-module="govuk-button">
        Continue
      </button>
    </form>
  );
};

export default EmailForm;
