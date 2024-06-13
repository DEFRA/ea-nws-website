const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../server')
const { startApiServer, apiServerStarted } = require('../test_api_setup')

lab.experiment('Integration tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    if (!apiServerStarted) {
      await startApiServer()
    }
    server = await createServer()
  })

  lab.test('POST / route with feedback', async () => {
    const options = {
      method: 'POST',
      url: '/api/signup/feedback',
      payload: {
        feedbackPreference: { preference: 'Satisfied' },
        feedbackText: 'test'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result).to.equal(options.payload)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('POST / route with no payload', async () => {
    const options = {
      method: 'POST',
      url: '/api/signup/feedback'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })
})
