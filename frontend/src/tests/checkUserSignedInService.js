import createServer from '../../../backend/server'
import userIsSigndout from '../services/CheckUserSignInService'
const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = exports.lab = Lab.script()

lab.experiment('Web test', () => {
    let server;
    // create sever before tests
    lab.before(async () => {
        server = await createServer()
    });

    
})