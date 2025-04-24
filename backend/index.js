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
      process.exit(1)
    }
  })
