const joi = require("@hapi/joi");
const axios = require("axios");
const path = require("path");

const apiSignInStartCall = async (email) => {
  let isValid = 400;
  let signInToken = "";
  var raw = JSON.stringify({"email": email});
  console.log("Received from front-end: ", raw)
  if(!signInStartValidation(email)){
    return {"code": 101, "desc": "Invalid email"};
  }
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
    const responseData = await response.json();
    if(responseData.hasOwnProperty('desc')){
      isValid = responseData['code']
      desc = responseData['desc']
    }
    else{
      console.log("responseData",responseData)
      isValid = responseData['code'];
      signInToken = responseData['signInToken']
    }
    console.log("Received from API: ", responseData)
  }
  catch (error) {
    console.error("ERROR: ", error);
  }
  console.log({"code": isValid, "signInToken": signInToken})
  return {"code": isValid, "signInToken": signInToken};
}

const signInStartValidation = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email != "" && emailPattern.test(email);
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
          code: apiResponse['code'],
          signInToken: apiResponse['signInToken']
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
