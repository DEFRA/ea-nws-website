const joi = require("@hapi/joi");
const axios = require("axios");

module.exports = [
  {
    method: ["GET"],
    path: "/contactdetails",

    handler: (request, h) => {
      const data = {
        emailaddresses: ["matthew.pepper@gmail.com", "perry.pepper@gmail.com"],
        texts: ["07343 454590", "07889 668367"],
        phones: ["01475 721535"],
      };

      return h.response(data);
    },
  },
];
