const joi = require("@hapi/joi");
const axios = require("axios");

module.exports = [
  {
    method: ["GET"],
    path: "/contactdetails",

    handler: (request, h) => {
      const data = {
        emailAddresses: ["matthew.pepper@gmail.com", "perry.pepper@gmail.com"],
        telephones: ["07343 454590", "07889 668367"],
        phone: ["01475 721535"],
      };

      // Return the data as the response payload
      return h.response(data);
    },
  },
];
