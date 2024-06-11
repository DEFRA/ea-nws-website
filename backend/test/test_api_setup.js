const { spawn, execSync } = require('child_process')
const axios = require('axios')
const path = require('path')

const apiDir = path.resolve(__dirname, '../../api')
let apiProcess
let apiServerStarted = false

const startApiServer = async () => {
  if (!apiServerStarted) {
    console.log('Compiling TypeScript code...')
    try {
      execSync('tsc --project tsconfig.json', {
        cwd: apiDir,
        stdio: 'inherit'
      })
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
    apiServerStarted = true
    // console.log("Waiting for the server to start");
    await new Promise((resolve) => setTimeout(resolve, 5000))
  } else {
    console.log('The API server is already on')
  }
}

const stopApiServer = async () => {
  if (apiProcess) {
    console.log('Terminating API process...')
    apiProcess.kill('SIGTERM')
    await new Promise((resolve) => {
      apiProcess.on('close', () => {
        console.log('API process terminated')
        resolve()
        apiServerStarted = false
      })
    })
    console.log('Waiting for port release...')
    await new Promise((resolve) => setTimeout(resolve, 5000)) // Wait for 5 seconds after killing the process
  }
  // API process was struggling to terminate - added a script that kills anything on port 9000 once tests are run
  /* await new Promise((resolve, reject) => {
    exec("lsof -ti:9000 | xargs kill -9", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error terminating process on port 9000: ${error}`);
        reject(error);
      } else {
        console.log("Process on port 9000 terminated");
        resolve();
        apiServerStarted = false;
      }
    });
  }); */
  console.log('Cleanup complete')
}

const checkForApiServer = async () => {
  const start = Date.now()
  const timeout = 5000
  while (Date.now() - start < timeout) {
    try {
      const response = await axios.get('http://localhost:9000/')
      if (response.status === 200) {
        console.log('API server is up and running')
        return true
      }
    } catch (error) {
      // If the request fails, wait for a bit before retrying
      return false
    }
  }
  return false
}

module.exports = {
  startApiServer,
  stopApiServer,
  checkForApiServer,
  apiServerStarted
}
