const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getUpdateProfile(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  const { profile } = req.payload as { profile: Object }
  console.log(Object.keys(profile).length != 0)
  console.log(profile)

  //not sure how to validate the profile data without doing hardcoded validation for each scenario
  if (authToken === 'MockGUIDAuthToken' && Object.keys(profile).length != 0) {
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getUpdateProfile }
