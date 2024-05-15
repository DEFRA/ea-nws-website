const routes = [].concat(
  require("../routes/public"),
  require("../routes/start"),
  require("../routes/signIn/signInStart"),
  require("../routes/signIn/signInValidate")
  require("../routes/initialEmailRegistration")
);

module.exports = {
  plugin: {
    name: "router",
    register: (server, options) => {
      server.route(routes);
    },
  },
};
