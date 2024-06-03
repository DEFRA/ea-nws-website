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

  lab.test('POST / route runs with valid email format', async () => {
    const options = {
      method: 'POST',
      url: '/signupStart',
      payload: {
        email: 'valid@email.com'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(200)
    Code.expect(response.result.data.registerToken).to.equal('123456')
  })

  lab.test('POST / route runs with invalid email format', async () => {
    const options = {
      method: 'POST',
      url: '/signupStart',
      payload: {
        email: 'invalid'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with invalid email format', async () => {
    const options = {
      method: 'POST',
      url: '/signupStart',
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
      url: '/signupStart',
      payload: {
        email: 'invalidemail@'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })
})
