const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const createServer = require('../../server')

lab.experiment('Integration tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('POST / route runs with invalid email', async () => {
    const options = {
      method: 'POST',
      url: '/signInStart',
      payload: {
        email: 'invalid@email.com'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(500)
  })

  lab.test('POST / route runs with invalid email format', async () => {
    const options = {
      method: 'POST',
      url: '/signInStart',
      payload: {
        email: 'invalidemail.uk'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.data.code).to.equal(106)
  })

  lab.test('POST / route runs with invalid email format', async () => {
    const options = {
      method: 'POST',
      url: '/signInStart',
      payload: {
        email: 'invalidemail@'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.data.code).to.equal(106)
  })

  lab.test('POST / route runs with valid email format', async () => {
    const options = {
      method: 'POST',
      url: '/signInStart',
      payload: {
        email: 'email@email.com'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })
})
