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

  lab.test('POST / route runs with invalid code', async () => {
    const options = {
      method: 'POST',
      url: '/signup/contactpreferences/landline/validate',
      payload: {
        authToken: 'MockGUIDAuthToken',
        phone: '07590000000',
        code: '999999'
      }
    }
    const response = await server.inject(options)
    // Code.expect(response.result.datacode).to.equal(101)
    Code.expect(response.statusCode).to.equal(500)
  })

  lab.test('POST / route runs with invalid code (too short)', async () => {
    const options = {
      method: 'POST',
      url: '/signup/contactpreferences/landline/validate',
      payload: {
        authToken: 'MockGUIDAuthToken',
        phone: '07590000000',
        code: '123'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(500)
  })

  lab.test('POST / route runs with invalid code (empty)', async () => {
    const options = {
      method: 'POST',
      url: '/signup/contactpreferences/landline/validate',
      payload: {
        authToken: 'MockGUIDAuthToken',
        phone: '07590000000',
        code: ''
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.statusCode).to.equal(500)
  })

  lab.test('POST / route runs with invalid code (empty)', async () => {
    const options = {
      method: 'POST',
      url: '/signup/contactpreferences/landline/validate',
      payload: {
        authToken: 'MockGUIDAuthToken',
        phone: '07590000000',
        code: ''
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })
})
