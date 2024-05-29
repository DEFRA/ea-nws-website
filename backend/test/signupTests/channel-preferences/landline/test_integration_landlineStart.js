const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../../../server')

lab.experiment('Integration tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('POST / route runs with invalid phone', async () => {
    const options = {
      method: 'POST',
      url: '/signup/contactpreferences/landline/start',
      payload: {
        authToken: 'MockGUIDAuthToken',
        phone: '12321'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.data.code).to.equal(104)
  })

  lab.test('POST / route runs with empty phone number', async () => {
    const options = {
      method: 'POST',
      url: '/signup/contactpreferences/landline/start',
      payload: {
        authToken: 'MockGUIDAuthToken',
        phone: ''
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.data.code).to.equal(104)
  })

  lab.test('POST / route runs with invalid authToken', async () => {
    const options = {
      method: 'POST',
      url: '/signup/contactpreferences/landline/start',
      payload: {
        authToken: 'InvalidGUIDAuthToken',
        phone: '07590000000'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(500)
  })

  lab.test('POST / route runs with valid email format', async () => {
    const options = {
      method: 'POST',
      url: '/signup/contactpreferences/landline/start',
      payload: {
        authToken: 'MockGUIDAuthToken',
        phone: '07590000000'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(204)
  })
})
