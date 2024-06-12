const hapiHealth = require('hapi-k8s-health')

module.exports = {
  plugin: hapiHealth.HealthPlugin,
  options: {
    livenessProbes: {
      status: () => Promise.resolve('OK')
    },
    readinessProbes: {
      status: () => Promise.resolve('OK')
    }
  }
}
