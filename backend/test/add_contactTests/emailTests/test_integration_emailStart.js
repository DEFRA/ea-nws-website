const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../../server')
const { startApiServer, apiServerStarted } = require('../../test_api_setup')
const uuidv4 = require('./../generateAuthToken')

lab.experiment('Integration tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    if (!apiServerStarted) {
      await startApiServer()
    }
    server = await createServer()
  })

  lab.test('POST / route runs with invalid email', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/email/add',
      payload: {
        authToken: uuidv4(),
        email: 'email@.com'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
    Code.expect(response.result.errorMessage).to.equal(
      'Enter an email address in the correct format, like name@example.com'
    )
  })

  lab.test('POST / route runs with empty phone number', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/email/add',
      payload: {
        authToken: uuidv4(),
        email: ''
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with invalid authToken', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/email/add',
      payload: {
        authToken: 'WrongAuthToken',
        email: 'test@test.com'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / route runs with valid email format', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/email/add',
      payload: {
        authToken: uuidv4(),
        email: 'test@test.com'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(200)
  })

  lab.test('POST / with duplicate payload', async () => {
    const options = {
      method: 'POST',
      url: '/api/add_contact/email/add',
      payload: {
        authToken: uuidv4(),
        email: 'duplicate@email.com'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })
})
