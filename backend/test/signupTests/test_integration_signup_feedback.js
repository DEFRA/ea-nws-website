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
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('POST / route with no payload', async () => {
    const options = {
      method: 'POST',
      url: '/api/signup/feedback'
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route with text not entered', async () => {
    const options = {
      method: 'POST',
      url: '/api/signup/feedback',
      payload: {
        feedbackPreference: { preference: 'Satisfied' },
        feedbackText: ''
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route with preference not selected', async () => {
    const options = {
      method: 'POST',
      url: '/api/signup/feedback',
      payload: {
        feedbackPreference: null,
        feedbackText: 'test'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })
})
