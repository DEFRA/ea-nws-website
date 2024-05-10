const joi = require("@hapi/joi");
const axios = require("axios");
const path = require("path");

const apiSignInValidateCall = async (signInToken, code) => {
  let isValid = 400;
  let desc;
  var raw = JSON.stringify({"signinToken": signInToken, "code": code});
  if(!signInValidateValidation(signInToken, code, 6)){
    return {"code": 101, "desc": "invalid code"}
  }
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
    if(responseData.hasOwnProperty('code')){
      isValid = responseData['code']
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
  
  return isValid === 200? {"authToken": authToken, "profile": profile, "registration": registration} : {"code": isValid, "desc": desc};
}


const signInValidateValidation = (signInToken, code, length) => {
  const numberPattern = new RegExp(`^[0-9]{${length}}$`);
  return signInToken != "" && code != "" && numberPattern.test(code);
}

module.exports = [
  {
    method: ["POST" , "PUT"],
    path: "/signInValidate",
    handler: async (request, h) => {
      try{
        const { signinToken, code } = request.payload;
        const apiResponse = await apiSignInValidateCall(signinToken, code);
        console.log(apiResponse)
        let response;
        if(apiResponse.hasOwnProperty('code')){
          console.log("Invalid")
          response = {
            code: apiResponse['code'],
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
