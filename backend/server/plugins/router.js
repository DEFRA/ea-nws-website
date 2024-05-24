const routes = [].concat(
  require('../routes/public'),
  require('../routes/start'),
  require('../routes/signIn/signInStart'),
  require('../routes/signIn/signInValidate'),
  require('../routes/signup/registerStart'),
  require('../routes/signup/registerValidate'),
  require('../routes/signup/channel-preferences/mobile/mobilePhoneAuthenticate'),
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
