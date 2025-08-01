const joi = require('@hapi/joi')
const envs = ['dev', 'test', 'prod']
const getSecretKeyValue = require('./services/SecretsManager')

// Define config schema
const schema = joi.object().keys({
  port: joi.number().default(5000),
  env: joi
    .string()
    .valid(...envs)
    .default(envs[0])
})

const config = async () => {
  // Build config
  const config = {
    port: await getSecretKeyValue('nws/website', 'backendPort'),
    env: await getSecretKeyValue('nws/website', 'environment')
  }

  // Validate config
  const { error, value } = schema.validate(config)

  // Throw if config is invalid
  if (error) {
    throw new Error(`The server config is invalid. ${error.message}`)
  }

  // Add some helper props
  value.isDev = value.env === 'dev'

  return value
}

module.exports = config
