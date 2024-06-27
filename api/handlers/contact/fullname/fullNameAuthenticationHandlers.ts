const responseCodes = require("../../responseCodes");
import Hapi from "@hapi/hapi";
import type { Context } from "openapi-backend";

async function getFullNameStart(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string };
  const { firstName } = req.payload as { firstName: string };
  const { lastName } = req.payload as { lastName: string };

  console.log(
    "LP - API fullname_start Received full name request for: ",
    req.payload
  );
  // 200 Success
  if (authToken === "MockAuthToken") {
    return res.response(responseCodes.SUCCESS);
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500);
  }
}

async function getFullNameValidate(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string };
  const { firstName } = req.payload as { firstName: string };
  const { lastName } = req.payload as { lastName: string };
  const profile = {
    id: "1",
    enabled: true,
    firstName: "John",
    lastName: "Smith",
    emails: ["matthew.pepper@gmail.com", "perry.pepper@gmail.com"],
    mobilePhones: ["07343454555", "07889668355"],
    homePhones: ["01475721535"],
    language: "EN",
    additionals: [],
    unverified: {
      emails: [],
      mobilePhones: [],
      homePhones: ["01475721535"],
    },
    pois: {
      address: "Exeter, United Kingdom",
      coordinates: {
        latitude: "50726037",
        longitude: "-3527489",
      },
    },
  };
  // 200 Success
  if (authToken === "MockAuthToken") {
    return {
      profile: profile,
    };
  } else {
    return res.response(responseCodes.INVALID_CODE).code(500);
  }
}

module.exports = { getFullNameStart, getFullNameValidate };
