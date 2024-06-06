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
        url: '/signup/contactpreferences/landline/validate'
      }
      const response = await server.inject(options)
      Code.expect(response.statusCode).to.equal(400)
    }
  )

  lab.test('GET / sending a GET instead of POST', async () => {
    const options = {
      method: 'GET',
      url: '/signup/contactpreferences/landline/validate'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('POST / Response status is 200 if everything is ok', async () => {
    const options = {
      method: 'POST',
      url: '/signup/contactpreferences/landline/validate',
      payload: {
        authToken: 'MockAuthToken',
        phone: '07590000000',
        code: '123456'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })
})
