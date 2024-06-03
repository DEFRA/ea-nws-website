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

  lab.test(
    'POST / the payload is missing from the POST call, bad request',
    async () => {
      const options = {
        method: 'POST',
        url: '/signInValidate'
      }
      const response = await server.inject(options)
      Code.expect(response.statusCode).to.equal(400)
    }
  )

  lab.test('GET / sending a GET instead of POST', async () => {
    const options = {
      method: 'GET',
      url: '/signInValidate'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('POST / Response status is 200 if everything is ok', async () => {
    const options = {
      method: 'POST',
      url: '/signInValidate',
      payload: { signinToken: '654321', code: '123456' }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result.data.authToken)
  })
})
