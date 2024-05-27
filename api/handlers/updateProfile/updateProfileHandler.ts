import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'
const responseCodes = require('../responseCodes')

async function updateProfile(context: Context, req: Hapi.Request) {
  console.log('payload', req.payload)
  return { OK: 'OK' }
}

module.exports = { updateProfile }
