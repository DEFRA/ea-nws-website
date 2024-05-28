const routes = [].concat(
  require('../routes/public'),
  require('../routes/start'),
  require('../routes/signin/signin_start'),
  require('../routes/signin/signin_validate'),
  require('../routes/signup/register_start'),
  require('../routes/signup/register_validate'),
  require('../routes/update_profile/update_profile'),
  require('../routes/signup/channel-preferences/landline/verify_landline_start'),
  require('../routes/signup/channel-preferences/landline/verify_landline_validate')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
