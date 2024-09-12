const hapi = require('@hapi/hapi')
const config = require('./config')
const schedule = require('node-schedule')
const { scheduledLPMTransfer } = require('./services/LPM-S3-Transfer')

async function createServer () {
  // Create the hapi server
  const conf = await config()

  const server = hapi.server({
    port: conf.port,
    routes: {
      cors: true,
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  })

  // Register the plugins
  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/logging'))
  await server.register(require('./plugins/health'))
  await server.register(require('blipp'))

  if (!conf.isDev) {
    // Send logs to bucket every hour
    schedule.scheduleJob('0 * * * *', async () => {
      await scheduledLPMTransfer()
    })
  }

  server.log(['debug'], 'server running')
  return server
}

module.exports = createServer
