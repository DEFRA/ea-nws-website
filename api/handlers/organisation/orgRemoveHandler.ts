const responseCodes = require('../responseCodes')
import Hapi from '@hapi/hapi'
import type { Context } from 'openapi-backend'

<<<<<<<< HEAD:api/handlers/partner/registerLocationToPartnerHandler.ts
async function getRegisterLocationToPartner(
========
async function getOrgRemove(
>>>>>>>> e3f4f8ed1d45e3b20146ad0d73a965626d86001b:api/handlers/organisation/orgRemoveHandler.ts
  context: Context,
  req: Hapi.Request,
  res: Hapi.ResponseToolkit
) {
  const { authToken } = req.payload as { authToken: string }
<<<<<<<< HEAD:api/handlers/partner/registerLocationToPartnerHandler.ts
  const { locationId } = req.payload as { locationId: string }
  const { partnerId } = req.payload as { partnerId: string }
  const { params } = req.payload as { params: Object }
========
>>>>>>>> e3f4f8ed1d45e3b20146ad0d73a965626d86001b:api/handlers/organisation/orgRemoveHandler.ts

  if (authToken !== 'WrongAuthToken') {
    return res.response(responseCodes.SUCCESS)
  } else {
    return res.response(responseCodes.INVALID_TOKEN).code(500)
  }
}

<<<<<<<< HEAD:api/handlers/partner/registerLocationToPartnerHandler.ts
module.exports = { getRegisterLocationToPartner }
========
module.exports = { getOrgRemove }
>>>>>>>> e3f4f8ed1d45e3b20146ad0d73a965626d86001b:api/handlers/organisation/orgRemoveHandler.ts
