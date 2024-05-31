const { spawn, execSync } = require('child_process')
const Lab = require('@hapi/lab')
const lab = (exports.lab = Lab.script())
const path = require('path')

const apiDir = path.resolve(__dirname, '../../api')
let apiProcess

lab.before(async () => {
  // Compile TypeScript code to JavaScript
  console.log('Compiling TypeScript code...')
  try {
    execSync('tsc --project tsconfig.json', { cwd: apiDir, stdio: 'inherit' })
  } catch (error) {
    console.error('TypeScript compilation failed')
    process.exit(1)
  }

  // Start the API server
  console.log('Starting API server...')
  apiProcess = spawn('node', ['index.js'], {
    env: { ...process.env, PORT: '9000' },
    cwd: apiDir,
    stdio: 'inherit'
  })
  // Wait until the server is ready
  await new Promise((resolve) => setTimeout(resolve, 5000))
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
