const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../server')

lab.experiment('Web test', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('POST /signupValidate route runs with valid payload', async () => {
    const options = {
      method: 'POST',
      url: '/signupValidate',
      payload: {
        email: 'test@test.com',
        registerToken: '123456'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('GET  sending a GET response instead of POST', async () => {
    const options = {
      method: 'GET',
      url: '/signupValidate'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('POST / payload is missing', async () => {
    const options = {
      method: 'POST',
      url: '/signupValidate'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })
})
