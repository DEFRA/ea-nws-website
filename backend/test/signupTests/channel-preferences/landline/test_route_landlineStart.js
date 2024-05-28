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

  lab.test(
    'POST / the payload is missing from the POST call, bad request',
    async () => {
      const options = {
        method: 'POST',
        url: '/signup/contactpreferences/landline/start'
      }
      const response = await server.inject(options)
      Code.expect(response.statusCode).to.equal(400)
    }
  )

  lab.test('GET / sending a GET instead of POST', async () => {
    const options = {
      method: 'GET',
      url: '/signup/contactpreferences/landline/start'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('POST / Response status is 200 if everything is ok', async () => {
    const options = {
      method: 'POST',
      url: '/signup/contactpreferences/landline/start',
      payload: {
        authToken: 'validGUIDAuthToken',
        phone: '07590000000'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
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
    Code.expect(response.result.status).to.equal(200)
  })
})
