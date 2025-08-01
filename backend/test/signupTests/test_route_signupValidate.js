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

  lab.test('POST /signupValidate route runs with valid payload', async () => {
    const options = {
      method: 'POST',
      url: '/api/sign_up_validate',
      payload: {
        code: '123456',
        registerToken: 'token'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(200)
  })

  lab.test('GET  sending a GET response instead of POST', async () => {
    const options = {
      method: 'GET',
      url: '/api/sign_up_validate'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('POST / payload is missing', async () => {
    const options = {
      method: 'POST',
      url: '/api/sign_up_validate'
    }

    const response = await server.inject(options)
    console.log(
      'POST /api/signupValidate with missing payload response:',
      response
    )
    Code.expect(response.result.status).to.equal(500)
  })
})
