const joi = require("@hapi/joi");
const axios = require("axios");
const path = require("path");

module.exports = [
  {
    method: ["GET"],
    path: "/signIn",

    handler: (request, h) => {
      return "Hello World!";
    }
  },
  {
    method: ["POST" , "PUT"],
    path: "/signIn",
    handler: (request, h) => {
      const { email } = request.payload;
      //do some email validation

      const response = {
        message: "RECEIVED: " + email
      };
      return h.response(response).code(200);
    }
  }
];
