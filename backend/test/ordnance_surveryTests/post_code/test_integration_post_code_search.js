const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../../server')
const { startApiServer, apiServerStarted } = require('../../test_api_setup')

lab.experiment('Integration tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    if (!apiServerStarted) {
      await startApiServer()
    }
    server = await createServer()
  })

  lab.test('POST / route with postcode', async () => {
    const options = {
      method: 'POST',
      url: '/api/os-api/postcode-search',
      payload: {
        postCode: 'SW1A 0AA'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(200)
  })

  lab.test('POST / route with no payload', async () => {
    const options = {
      method: 'POST',
      url: '/api/os-api/postcode-search'
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })
})
