const { spawn, execSync } = require('child_process')
const Lab = require('@hapi/lab')
const lab = (exports.lab = Lab.script())
const path = require('path')
const axios = require('axios')
const apiDir = path.resolve(__dirname, '../../api')
let apiProcess

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
  console.log('Compiling TypeScript code...')
  try {
    execSync('tsc --project tsconfig.json', { cwd: apiDir, stdio: 'inherit' })
  } catch (error) {
    console.error('TypeScript compilation failed')
    process.exit(1)
  }

  // Start the API server
  console.log('Starting API server...')
  apiProcess = spawn('node', ['./dist/index.js'], {
    env: { ...process.env, PORT: '9000' },
    cwd: apiDir,
    stdio: 'inherit'
  })
  // Wait until the server is ready

  console.log('Waiting for the server to start')
  await waitForServer('http://localhost:9000/', 3000)
})

lab.onCleanup = async () => {
  if (apiProcess) {
    console.log('Terminating API process...')
    apiProcess.kill('SIGTERM')
    await new Promise((resolve) => {
      apiProcess.on('close', () => {
        console.log('API process terminated')
        resolve()
      })
    })
    console.log('Waiting for port release...')
    await new Promise((resolve) => setTimeout(resolve, 5000)) // Wait for 5 seconds after killing the process
  }
  //API process was struggling to terminate - added a script that kills anything on port 9000 once tests are run
  await new Promise((resolve, reject) => {
    exec('lsof -t -i:9000 | xargs kill -9', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error terminating process on port 9000: ${error}`)
        reject(error)
      } else {
        console.log('Process on port 9000 terminated')
        resolve()
      }
    })
  })
  console.log('Cleanup complete')
}
