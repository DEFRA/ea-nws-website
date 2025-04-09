const createServer = require('./server')
const { logger } = require('./server/plugins/logging')

createServer()
  .then((server) => server.start())
  .catch((err) => {
    try {
      logger.error(err)
    } catch {
      console.log(err)
    } finally {
      server.app.redis.disconnect()
      process.exit(1)
    }
  })
