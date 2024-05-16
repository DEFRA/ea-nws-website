const joi = require("@hapi/joi");
const axios = require("axios");

module.exports = [
  {
    method: ["GET"],
    path: "/startreact",

    handler: (request, h) => {return "hello"},
  },
];
