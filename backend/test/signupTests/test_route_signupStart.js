const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../server')
const { startApiServer, apiServerStarted } = require('./../test_api_setup')

lab.experiment('Route tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    if (!apiServerStarted) {
      await startApiServer()
    }
    server = await createServer()
  })

  lab.test('POST / route runs with valid payload', async () => {
    const options = {
      method: 'POST',
      url: '/api/signupStart',
      payload: {
        email: 'test@test.com'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(200)
    Code.expect(response.result.data.registerToken).to.equal('123456')
  })

  lab.test('GET / instead of POST', async () => {
    const options = {
      method: 'GET',
      url: '/api/signupStart',
      payload: {
        email: ''
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('POST / with missing payload', async () => {
    const options = {
      method: 'POST',
      url: '/api/signupStart'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })
})
