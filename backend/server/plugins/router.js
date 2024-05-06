const routes = [].concat(
  require("../routes/public"),
  require("../routes/start"),
  require("../routes/signIn")
);

module.exports = {
  plugin: {
    name: "router",
    register: (server, options) => {
      server.route(routes);
    },
  },
};
