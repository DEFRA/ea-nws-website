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
    method: ["POST"],
    path: "/signIn",
    handler: (request, h) => {
      return "RECEIVED!"
    }
  }
];
