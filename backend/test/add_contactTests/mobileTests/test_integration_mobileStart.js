const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../../server')
const { startApiServer, apiServerStarted } = require('../../test_api_setup')
const uuidv4 = require('./../../generateAuthToken')

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
        authToken: uuidv4(),
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
        authToken: uuidv4(),
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
        authToken: 'WrongAuthToken',
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
        authToken: uuidv4(),
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
        authToken: uuidv4(),
        msisdn: '+447000000000'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / with duplicate payload in different format', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/mobile/add',
      payload: {
        authToken: uuidv4(),
        msisdn: '07000000000'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })
})
