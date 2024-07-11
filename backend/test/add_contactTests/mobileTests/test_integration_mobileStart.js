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

  lab.test('POST / route runs with invalid phone', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/mobile/add',
      payload: {
        authToken: 'MockAuthToken',
        msisdn: '12321'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
    Code.expect(response.result.errorMessage).to.equal(
      'Enter a valid UK mobile telephone number'
    )
  })

  lab.test('POST / route runs with empty phone number', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/mobile/add',
      payload: {
        authToken: 'MockAuthToken',
        msisdn: ''
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with invalid authToken', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/mobile/add',
      payload: {
        authToken: 'InvalidGUIDAuthToken',
        msisdn: '07590000000'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with valid mobile format', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/mobile/add',
      payload: {
        authToken: 'MockAuthToken',
        msisdn: '07590000000'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(200)
  })

  lab.test('POST / with duplicate payload', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/mobile/add',
      payload: {
        authToken: 'MockAuthToken',
        msisdn: '+447000000000'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })
})
