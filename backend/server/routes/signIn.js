const joi = require("@hapi/joi");
const axios = require("axios");
const path = require("path");

const apiSignInStartCall = async (email) => {
  let isValid = 400;
  let signInToken = "";
  var raw = JSON.stringify({"email": email});
  try {
    const response = await fetch("http://localhost:9000/member/signinStart", {
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
    isValid = responseData['statusCode'];
    signInToken = responseData['signInToken']
  }
  catch (error) {
    console.error("ERROR: ", error);
  }
  return {"statusCode": isValid, "signInToken": signInToken};
}

const apiSignInValidateCall = async (signInToken, code) => {
  let isValid = 400;
  let desc;
  var raw = JSON.stringify({"signinToken": signInToken, "code": code});
  try {
    const response = await fetch("http://localhost:9000/member/signinValidate", {
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
    console.log(responseData)
    if(responseData.hasOwnProperty('statusCode')){
      isValid = responseData['statusCode']
      desc = responseData['desc']
    }
    else{
      isValid = 200
      profile = responseData['profile'];
      authToken = responseData['authToken']
      registration = responseData['registration']
    }


  }
  catch (error) {
    console.error("ERROR: ", error);
  }

  return isValid === 200? {"authToken": authToken, "profile": profile, "registration": registration} : {"statusCode": isValid, "desc": desc};
}

module.exports = [
  {
    method: ["POST" , "PUT"],
    path: "/signInStart",
    handler: async (request, h) => {
      try{
        const { email } = request.payload;
        //do some email validation
        const apiResponse = await apiSignInStartCall(email);
        const response = {
          statusCode: apiResponse['statusCode'],
          signInToken: apiResponse['signInToken']
        };
        
        return h.response(response);
      }

      catch (error) {
        console.error("Error:", error);
        return h.response({ message: "Internal server error" }).code(500);
      }
    }
  },
  {
    method: ["POST" , "PUT"],
    path: "/signInValidate",
    handler: async (request, h) => {
      try{
        const { signinToken, code } = request.payload;

        const apiResponse = await apiSignInValidateCall(signinToken, code);
        let response;
        if(apiResponse.hasOwnProperty('statusCode')){
          console.log("Invalid")
          response = {
            statusCode: apiResponse['statusCode'],
            desc: apiResponse['desc']
          }
        }else{
          console.log("Valid")
          response = {
            authToken: apiResponse['authToken'],
            profile: apiResponse['profile'],
            registration: apiResponse['registration']
          };
        }

        
        return h.response(response);
      }

      catch (error) {
        console.error("Error:", error);
        return h.response({ message: "Internal server error" }).code(500);
      }
    }
  }
];
