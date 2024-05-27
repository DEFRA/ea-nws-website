import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
const responseCodes = require('../responseCodes')

async function getUpdateProfile(context: Context, req: Hapi.Request) {
  console.log('payload', req.payload)
  return { ...responseCodes.SUCCESS, Desc: 'It works' }
}

module.exports = { getUpdateProfile }
