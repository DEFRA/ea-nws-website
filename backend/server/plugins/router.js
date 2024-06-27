const routes = [].concat(
  require("../routes/public"),
  require("../routes/start"),
  require("../routes/signin/signin_start"),
  require("../routes/signin/signin_validate"),
  require("../routes/signup/signupStart"),
  require("../routes/signup/signupValidate"),
  require("../routes/update_profile/update_profile"),
  require("../routes/add_contact/mobile/mobile_start"),
  require("../routes/add_contact/mobile/mobile_validate"),
  require("../routes/add_contact/landline/landline_start"),
  require("../routes/add_contact/landline/landline_validate"),
  require("../routes/add_contact/email/email_start"),
  require("../routes/add_contact/email/email_validate"),
  require("../routes/add_contact/fullname/fullname_start")
);

module.exports = {
  plugin: {
    name: "router",
    register: (server, options) => {
      server.route(routes);
    },
  },
};
