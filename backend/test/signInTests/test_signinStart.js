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

  lab.test('GET /startReact route works', async () => {
    const options = {
      method: 'GET',
      url: '/startreact'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('POST / route runs with invalid payload', async () => {
    const options = {
      method: 'POST',
      url: '/signinStart',
      payload: {
        email: 'invalid'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.code).to.equal(101)
  })

  lab.test(
    'POST / route runs with invalid payload as not recognised',
    async () => {
      const options = {
        method: 'POST',
        url: '/signinStart',
        payload: {
          email: 'invalid@email.com'
        }
      }

      const response = await server.inject(options)
      console.log(response)
      Code.expect(response.result.code).to.equal(101)
    }
  )

  lab.test(
    'POST / route runs with invalid payload as invalid email format',
    async () => {
      const options = {
        method: 'POST',
        url: '/signinStart',
        payload: {
          email: 'invalidemail.com'
        }
      }

      const response = await server.inject(options)
      Code.expect(response.result.code).to.equal(101)
    }
  )

  lab.test('POST / route runs with invalid email format', async () => {
    const options = {
      method: 'POST',
      url: '/signinStart',
      payload: {
        email: 'invalidemail@'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.result.code).to.equal(101)
  })
})
