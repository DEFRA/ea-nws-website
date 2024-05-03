const routes = [].concat(
  require("../routes/public"),
  require("../routes/start")
);

module.exports = {
  plugin: {
    name: "router",
    register: (server, options) => {
      server.route(routes);
    },
  },
};
