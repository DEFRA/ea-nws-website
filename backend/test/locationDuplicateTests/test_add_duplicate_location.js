const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../server')
const { startApiServer, apiServerStarted } = require('./../test_api_setup')

lab.experiment('integration tests', () => {
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
        url: '/api/locations/check_duplicate'
      }
      const response = await server.inject(options)
      Code.expect(response.result.status).to.equal(500)
    }
  )

  lab.test(
    'POST / Response status is 500 if everything is ok', async () => {
      const options = {
        method: 'POST',
        url: '/api/locations/check_duplicate',
        payload: { authToken: '654321', Location: 'Location name 1' }
      }
      const response = await server.inject(options)
      Code.expect(response.result.status).to.equal(500)
    }
  )
})
