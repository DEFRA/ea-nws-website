const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../server')
const { startApiServer, apiServerStarted } = require('./../test_api_setup')

lab.experiment('Integration tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    if (!apiServerStarted) {
      await startApiServer()
    }
    server = await createServer()
  })

  lab.test('POST / route runs with invalid email', async () => {
    const options = {
      method: 'POST',
      url: '/api/sign_in',
      payload: {
        email: 'invalid@email.com'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with invalid email format', async () => {
    const options = {
      method: 'POST',
      url: '/api/sign_in',
      payload: {
        email: 'invalidemail.uk'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with invalid email format', async () => {
    const options = {
      method: 'POST',
      url: '/api/sign_in',
      payload: {
        email: 'invalidemail@'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with valid email format', async () => {
    const options = {
      method: 'POST',
      url: '/api/sign_in',
      payload: {
        email: 'email@email.com'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(200)
  })
})
