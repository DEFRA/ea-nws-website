const routes = [].concat(
  require('../routes/public'),
  require('../routes/start'),
  require('../routes/signin/signin_start'),
  require('../routes/signin/signin_validate'),
  require('../routes/signup/signupStart'),
  require('../routes/signup/signupValidate'),
  require('../routes/signup/signup_feedback'),
  require('../routes/update_profile/update_profile'),
  require('../routes/signup/channel-preferences/mobile/mobile_start'),
  require('../routes/signup/channel-preferences/mobile/mobile_validate'),
  require('../routes/signup/channel-preferences/landline/verify_landline_start'),
  require('../routes/signup/channel-preferences/landline/verify_landline_validate'),
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
