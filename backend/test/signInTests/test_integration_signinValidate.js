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

  lab.test(
    'POST / should return 101 + desc InvalidToken, code is invalid in mockAPI',
    async () => {
      const options = {
        method: 'POST',
        url: '/signInValidate',
        payload: {
          signinToken: '654321',
          code: '999999'
        }
      }
      const response = await server.inject(options)
      Code.expect(response.result.errorMessage.code).to.equal(101)
      Code.expect(response.result.status).to.equal(500)
    }
  )

  lab.test('POST / should return 101, code empty', async () => {
    const options = {
      method: 'POST',
      url: '/signInValidate',
      payload: {
        signinToken: '654321',
        code: ''
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test('POST / should return 101, code too short', async () => {
    const options = {
      method: 'POST',
      url: '/signInValidate',
      payload: {
        signinToken: '654321',
        code: '1234'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.result.status).to.equal(500)
  })

  lab.test(
    'POST / Should return authToken, profile and registration - valid code',
    async () => {
      const options = {
        method: 'POST',
        url: '/signInValidate',
        payload: {
          signinToken: '654321',
          code: '678901'
        }
      }
      const response = await server.inject(options)
      Code.expect(response.statusCode).to.equal(200)
      Code.expect(response.result.data.profile).to.exist
      Code.expect(response.result.data.registrations).to.exist
      Code.expect(response.result.data.authToken).to.equal('MockGUIDAuthToken')
    }
  )
})
