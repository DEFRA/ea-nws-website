import TextInput from "../../gov-uk-components/TextInput";

const backendCall = require("../../services/BackendService");
const signInToken = window.sessionStorage.getItem("signInToken");

const CodeForm = ({ errorList, setErrorList }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const code = event.target.code.value;
    const errors = [];
    if (code === "") {
      errors.push("Enter code");
    } else if (!validateNumber(code, 6)) {
      errors.push("Code must be 6 numbers");
    }
    if (errors.length === 0) {
      const backendResponse = await validateCode(code);
      if (!backendResponse) {
        errors.push("Invalid code");
      }
    }
    if (errors.length > 0) {
      setErrorList(errors);
      return;
    }
    setErrorList();
    event.target.reset();
    window.location.replace("Start");
  };

  const validateCode = async (code) => {
    var raw = JSON.stringify({ signinToken: signInToken, code: code });
    const responseData = await backendCall(raw, "signInValidate");

    if (responseData === undefined || responseData.hasOwnProperty("code")) {
      return false;
    }

    window.sessionStorage.setItem("authToken", responseData["authToken"]);
    window.sessionStorage.setItem("profile", responseData["profile"]);
    window.sessionStorage.setItem("registration", responseData["registration"]);
    return true;
  };

  const validateNumber = (input, digits) => {
    const numberPattern = new RegExp(`^[0-9]{${digits}}$`);
    return numberPattern.test(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput name="Enter code" id="code" errorList={errorList}></TextInput>
      <button type="submit" class="govuk-button" data-module="govuk-button">
        Continue
      </button>
    </form>
  );
};

export default CodeForm;
