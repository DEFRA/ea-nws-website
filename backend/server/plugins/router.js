const routes = [].concat(
  require('../routes/public'),
  require('../routes/start'),
  require('../routes/signIn/signInStart'),
  require('../routes/signIn/signInValidate'),
  require('../routes/signup/signupStart'),
  require('../routes/signup/signupValidate'),
  require('../routes/update_profile/update_profile')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
