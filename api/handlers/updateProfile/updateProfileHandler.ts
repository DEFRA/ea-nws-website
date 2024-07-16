const responseCodes = require("../responseCodes")
import Hapi from "@hapi/hapi"
import type { Context } from "openapi-backend"

async function getUpdateProfile(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { profile } = req.payload as { profile: Object }

  //not sure how to validate the profile data without doing hardcoded validation for each scenario
  if (authToken === "MockAuthToken" && Object.keys(profile).length != 0) {
    return {
      authToken: 'MockAuthToken',
      profile: profile
    }
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getUpdateProfile }
