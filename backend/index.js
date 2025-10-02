const createServer = require('./server')
const { logger } = require('./server/plugins/logging')
const numCPUs = require('node:os').availableParallelism()
const process = require('node:process')
const cluster = require('node:cluster')

if (cluster.isPrimary) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })

} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  createServer(cluster.worker.id)
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

  console.log(`Worker ${process.pid} started`)
}

