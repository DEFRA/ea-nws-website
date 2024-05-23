const { spawn, execSync } = require('child_process')
const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const lab = (exports.lab = Lab.script())
const path = require('path')
const fetch = require('node-fetch')

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
    console.log('Cleanup complete')
  }
}

lab.test('example test', async () => {
  const response = await fetch('http://localhost:9000/') // Adjust the endpoint
  const data = await response.json()
  expect(data).to.be.an.object()
})
