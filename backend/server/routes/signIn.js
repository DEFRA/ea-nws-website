const joi = require("@hapi/joi");
const axios = require("axios");
const path = require("path");

const apiSignInStartCall = async (email) => {
  let isValid = 400;
  var raw = JSON.stringify({"email": email});
  try {
    const response = await fetch("http://localhost:9000/member/signInStart", {
      method: "POST",
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: raw,
    });

    // Parse the JSON response and get the status code
    const responseData = await response.json();
    const statusCode = responseData['code'];  
    console.log("StatusCode", statusCode)
    console.log("StatusCodeType", typeof statusCode)
    // Assign the status code to isValid
    isValid = statusCode;

  }
  catch (error) {
    console.log("ERROR: ", error);
  }
  return isValid;
}

module.exports = [
  {
    method: ["POST" , "PUT"],
    path: "/signInStart",
    handler: async (request, h) => {
      try{
        const { email } = request.payload;
        //do some email validation
        const emailValid = await apiSignInStartCall(email);
        const response = {
          code: emailValid
        };
        
        return h.response(response);
      }

      catch (error) {
        console.error("Error:", error);
        return h.response({ message: "Internal server error" }).code(500);
      }
    }
  }
];
