const routes = [].concat(
  require('../routes/public'),
  require('../routes/start'),
  require('../routes/contact_details/remove_contact_details'),
  require('../routes/signIn/signInStart'),
  require('../routes/signIn/signInValidate')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
