const hapi = require('@hapi/hapi')
const config = require('./config')

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
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

  server.log(['debug'], 'server running')
  return server
}

module.exports = createServer
