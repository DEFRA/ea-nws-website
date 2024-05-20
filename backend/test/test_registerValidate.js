const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = exports.lab = Lab.script()
const createServer = require('../server')

lab.experiment('Web test', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('POST /registerValidate route runs with valid payload', async () => {
    const options = {
      method: 'POST',
      url: '/registerValidate',
      payload: {
        email: 'test@test.com'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.statusMessage).to.equal('OK')
  })

  lab.test('POST /registerValidate route runs with invalid payload', async () => {
    const options = {
      method: 'POST',
      url: '/registerValidate',
      payload: {
        email: 'invalidtest.com'
      }
    }

    const response = await server.inject(options)

    Code.expect(response.result.code).to.equal(101)
    Code.expect(response.result.desc).to.equal('invalid code')
  })
})
