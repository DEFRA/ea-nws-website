const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../../server')
const { startApiServer, apiServerStarted } = require('./../../test_api_setup')

lab.experiment('Integration tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    if (!apiServerStarted) {
      await startApiServer()
    }
    server = await createServer()
  })

  lab.test('POST / route runs with missing authtoken', async () => {
    const options = {
      method: 'POST',
      url: '/api/partner/register',
      payload: {
        authToken: '',
        partnerId: '1',
        params: { someParam: '1' }
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with missing partnerId', async () => {
    const options = {
      method: 'POST',
      url: '/api/partner/register',
      payload: {
        authToken: 'MockAuthToken',
        partnerId: '',
        params: { someParam: '1' }
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with missing params', async () => {
    const options = {
      method: 'POST',
      url: '/api/partner/register',
      payload: {
        authToken: 'MockAuthToken',
        partnerId: '1',
        params: {}
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with all parameters', async () => {
    const options = {
      method: 'POST',
      url: '/api/partner/register',
      payload: {
        authToken: 'MockAuthToken',
        partnerId: '1',
        params: { someParam: '1' }
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(200)
  })
})
