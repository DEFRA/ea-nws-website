const routes = [].concat(
  require('../routes/public'),
  require('../routes/sign_in/signin_start'),
  require('../routes/sign_in/signin_validate'),
  require('../routes/sign_up/signup_start'),
  require('../routes/sign_up/signup_validate'),
  require('../routes/sign_up/signup_feedback'),
  require('../routes/update_profile/update_profile'),
  require('../routes/add_contact/mobile/mobile_start'),
  require('../routes/add_contact/mobile/mobile_validate'),
  require('../routes/add_contact/landline/landline_start'),
  require('../routes/add_contact/landline/landline_validate'),
  require('../routes/add_contact/email/email_start'),
  require('../routes/add_contact/email/email_validate'),
  require('../routes/partner/register_to_partner'),
  require('../routes/ordnance_survey/post_code_search'),
  require('../routes/ordnance_survey/oauth_2'),
  require('../routes/account/account_delete')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
