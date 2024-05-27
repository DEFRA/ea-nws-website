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

  lab.test('POST / route runs with valid payload', async () => {
    const options = {
      method: 'POST',
      url: '/signupStart',
      payload: {
        email: 'test@test.com'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.statusMessage).to.equal('OK')
    Code.expect(response.result.registerToken).to.equal('123456')
  })

  lab.test('POST / route runs with invalid payload', async () => {
    const options = {
      method: 'POST',
      url: '/signupStart',
      payload: {
        email: 'invalid'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.result.code).to.equal(101)
  })

  lab.test(
    'POST / route runs with invalid payload as email already registered',
    async () => {
      const options = {
        method: 'POST',
        url: '/signupStart',
        payload: {
          email: 'emailAlreadyInUse@email.com'
        }
      }

      const response = await server.inject(options)
      Code.expect(response.result.code).to.equal(101)
    }
  )

  lab.test('POST / route runs with invalid payload as missing @', async () => {
    const options = {
      method: 'POST',
      url: '/signupStart',
      payload: {
        email: 'invalidemail.com'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.result.code).to.equal(101)
  })

  lab.test(
    'POST / route runs with invalid payload as missing .com',
    async () => {
      const options = {
        method: 'POST',
        url: '/signupStart',
        payload: {
          email: 'invalidemail@'
        }
      }

      const response = await server.inject(options)
      Code.expect(response.result.code).to.equal(101)
    }
  )
})
