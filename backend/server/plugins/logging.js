const config = require('../config')
const pino = require('pino')
const fs = require('fs')

const logdir = './NWS-logs'

if (!fs.existsSync(logdir)) {
  fs.mkdirSync(logdir, { recursive: true })
}

const createSonicBoom = (dest) =>
  pino.destination({ dest: dest, append: true, sync: true })

const streams = [
  { level: 'debug', stream: createSonicBoom(`${logdir}/debug.log`) },
  { level: 'info', stream: createSonicBoom(`${logdir}/info.log`) },
  { level: 'warn', stream: createSonicBoom(`${logdir}/warn.log`) },
  { level: 'error', stream: createSonicBoom(`${logdir}/error.log`) },
  { level: 'fatal', stream: createSonicBoom(`${logdir}/fatal.log`) }
]

const level = config.isDev ? 'debug' : 'info'

const logger = pino(
  { level: level },
  pino.multistream(streams, { dedupe: true })
)

module.exports = {
  plugin: require('hapi-pino'),
  options: {
    instance: logger,
    logPayload: true,
    level: 'info'
  }
}
