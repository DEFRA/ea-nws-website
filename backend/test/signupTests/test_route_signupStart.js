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
    // Code.expect(response.statusMessage).to.equal('OK')
    Code.expect(response.result).to.equal('123456')
  })

  lab.test('GET / instead of POST', async () => {
    const options = {
      method: 'GET',
      url: '/signupStart',
      payload: {
        email: ''
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('POST / with missing payload', async () => {
    const options = {
      method: 'POST',
      url: '/signupStart'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })
})
