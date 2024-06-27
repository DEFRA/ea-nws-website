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

  lab.test('POST / route runs with invalid code', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/email/validate',
      payload: {
        authToken: 'MockAuthToken',
        email: 'test@test.com',
        code: '999999'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with invalid code (too short)', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/email/validate',
      payload: {
        authToken: 'MockAuthToken',
        email: 'test@test.com',
        code: '123'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with invalid code (empty)', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/email/validate',
      payload: {
        authToken: 'MockAuthToken',
        email: 'test@test.com',
        code: ''
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.errorMessage).to.equal('Enter code')
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with invalid code (empty)', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/email/validate',
      payload: {
        authToken: 'MockAuthToken',
        email: 'test@test.com',
        code: ''
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })
})
