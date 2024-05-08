const joi = require("@hapi/joi");
const axios = require("axios");

function validateEmail(email){
    const contains = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("console log validating email")
    if (contains.test(email) === false) 
    {
      console.log("returning false")
      setMessa
      return false;
    }
    return true;
}



module.exports = [
  {
    method: ["GET"],
    path: "/register",

    handler: (request, h) => {
      return "hello"},
    
  },
  {
    method: ["POST" , "PUT"],
    path: "/register",
    handler: (request, h) => {
      const { email } = request.payload;

      const response = {
        message: "RECEIVED: " + email
      };
      return h.response(response).code(200);
    }
  }
];


