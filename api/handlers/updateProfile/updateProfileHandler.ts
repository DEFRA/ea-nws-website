const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

async function getUpdateProfile(
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  console.log('hit')
  const { authToken } = req.payload as { authToken: string }
  const { profile } = req.payload as { profile: { pois: Array<Object> } }

  console.log('req.payload', req.payload)

  //not sure how to validate the profile data without doing hardcoded validation for each scenario
  if (authToken && Object.keys(profile).length != 0) {
    if (Array.isArray(profile.pois)) {
      profile.pois = profile.pois.map((poi, index) => ({
        ...poi,
        id: index + 1
      }))
    }

    console.log('profile', profile)

    return {
      authToken: authToken,
      profile: profile
    }
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

module.exports = { getUpdateProfile }
