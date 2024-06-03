/*const Lab = require('@hapi/lab')
const lab = (exports.lab = Lab.script())
const axios = require('axios')
const { startApiServer, stopApiServer } = require('./test_api_setup')

let serverSetupDone = false

// Helper function to wait for the server to start
const waitForServer = async (url, timeout = 30000) => {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      const response = await axios.get(url)
      if (response.status === 200) {
        console.log('API server is up and running')
        return
      }
    } catch (error) {
      // If the request fails, wait for a bit before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
  throw new Error('API server did not start within the timeout period')
}

lab.before(async () => {
  if (!serverSetupDone) {
    await startApiServer()
    await waitForServer('http://localhost:9000/')
    serverSetupDone = true
  }
})

lab.after(async () => {
  if (serverSetupDone) {
    await stopApiServer()
    serverSetupDone = false
  }
})

module.exports = [serverSetupDone]*/
