const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../../server')
const { startApiServer, apiServerStarted } = require('../../test_api_setup')
const uuidv4 = require('../../generateAuthToken')

lab.experiment('Integration tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    if (!apiServerStarted) {
      await startApiServer()
    }
    server = await createServer()
  })

  lab.test(
    'POST / the payload is missing from the POST call, bad request',
    async () => {
      const options = {
        method: 'POST',
        url: '/api/partner/register_location_to_partner'
      }
      const response = await server.inject(options)
      Code.expect(response.result.status).to.equal(500)
    }
  )

  lab.test('GET / sending a GET instead of POST', async () => {
    const options = {
      method: 'GET',
      url: '/api/partner/register_location_to_partner'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('POST / Response status is 200 if everything is ok', async () => {
    const options = {
      method: 'POST',
      url: '/api/partner/register_location_to_partner',
      payload: {
        authToken: uuidv4(),
        partnerId: '1',
        params: { someParam: '1' }
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(200)
  })
})
