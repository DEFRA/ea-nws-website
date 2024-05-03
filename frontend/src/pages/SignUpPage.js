import Button from "../gov-uk-components/Button";
import Footer from "../gov-uk-components/Footer";
import Header from "../gov-uk-components/Header";
import TextInput from "../gov-uk-components/TextInput";
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (newValue) => {
    setUsername(newValue);
  };

  const handlePasswordChange = (newValue) => {
    setPassword(newValue);
  };

  const handleSubmit = async () => {
    try {
      const formData = { username, password };
      const response = await axios.post("/signup", formData);
      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <br />
        <p class="govuk-heading-m">Sign up</p>
        <TextInput
          name={"Email Address"}
          value={username}
          onChange={handleUsernameChange}
        />
        <TextInput
          name={"Password"}
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          text={"Submit"}
          className={"govuk-button"}
          onClick={handleSubmit}
        />
      </div>
      <Footer />
    </>
  );
}
