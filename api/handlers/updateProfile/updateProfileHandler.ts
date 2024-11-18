const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getUpdateProfile(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
  let { profile } = req.payload as { profile: { pois?: Array<Object> } }

  //not sure how to validate the profile data without doing hardcoded validation for each scenario
  if (authToken && Object.keys(profile).length != 0) {
    if (Array.isArray(profile.pois)) {
      profile.pois = profile.pois.map((poi, index) => ({
        ...poi,
        id: index + 1
      }))
    }

    return {
      authToken: authToken,
      profile: profile
    }
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getUpdateProfile }
