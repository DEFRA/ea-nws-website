import 'source-map-support/register';
import OpenAPIBackend from 'openapi-backend';
import Hapi from '@hapi/hapi';
 
const server = new Hapi.Server({ port: 9000 });

// calling handlers
const signInHandlers = require('./handlers/signInHandlers')
const registerHandlers = require('./handlers/registerHandlers') 
const validationHandlers = require('./handlers/validationHandlers')

// define api
const api = new OpenAPIBackend({
  definition: './openapi/index.yaml',
  handlers: {
    getRegisterStart: registerHandlers.getRegisterStart,
    getRegisterValidate: registerHandlers.getRegisterValidate,
    getSignInStart: signInHandlers.getSigninStart,
    getSignInValidate: signInHandlers.getSigninValidate,
    validationFail: validationHandlers.validationFail,
    notFound: validationHandlers.notFound,
  },
});
 
api.init();
 
// use as a catch-all handler
server.route({
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  path: '/{path*}',
  handler: (req, h) =>
    api.handleRequest(
      {
        method: req.method,
        path: req.path,
        body: req.payload,
        query: req.query,
        headers: req.headers,
      },
      req,
      h,
    ),
});
 
// start server
server.start().then(() => console.info(`listening on ${server.info.uri}`));