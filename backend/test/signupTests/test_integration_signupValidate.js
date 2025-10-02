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

  lab.test('POST / should return 101, code empty', async () => {
    const options = {
      method: 'POST',
      url: '/api/sign_up_validate',
      payload: {
        registerToken: '654321',
        code: ''
      }
    }
    const response = await server.inject(options)
    console.log('result code here', response.result)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / should return 101, code too short', async () => {
    const options = {
      method: 'POST',
      url: '/api/sign_up_validate',
      payload: {
        registerToken: '654321',
        code: '1234'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / Should return authToken, - valid code', async () => {
    const options = {
      method: 'POST',
      url: '/api/sign_up_validate',
      payload: {
        registerToken: '654321',
        code: '678901'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.data.authToken)
  })
})
