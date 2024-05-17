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

  lab.test('POST / route runs with invalid email format', async () => {
    const options = {
      method: 'POST',
      url: '/signInStart',
      payload: {
        email: 'invalid@email.com'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.code).to.equal(106)
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
    Code.expect(response.result.code).to.equal(101)
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
    Code.expect(response.result.code).to.equal(101)
  })

  lab.test('POST / route runs with valid email format', async () => {
    const options = {
      method: 'POST',
      url: '/signInStart',
      payload: {
        email: 'valid@email.com'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.code).to.equal(200)
  })
})
