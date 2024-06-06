const Lab = require("@hapi/lab");
const Code = require("@hapi/code");
const lab = (exports.lab = Lab.script());
const createServer = require("../../server");
const apiServer = require("./../test_api_setup");

lab.experiment("Integration tests", () => {
  let server;

  // Create server before the tests
  lab.before(async () => {
    if (!apiServer.apiServerStarted) {
      await apiServer.startApiServer();
    }
    server = await createServer();
  });

  lab.after(async () => {
    await apiServer.stopApiServer();
  });

  lab.test("POST / should return 101, code empty", async () => {
    const options = {
      method: "POST",
      url: "/signupValidate",
      payload: {
        registerToken: "654321",
        code: "",
      },
    };
    const response = await server.inject(options);
    console.log("result code here", response.result);
    Code.expect(response.result.status).to.equal(500);
  });

  lab.test("POST / should return 101, code too short", async () => {
    const options = {
      method: "POST",
      url: "/signupValidate",
      payload: {
        registerToken: "654321",
        code: "1234",
      },
    };
    const response = await server.inject(options);
    Code.expect(response.result.errorMessage.code).to.equal(101);
  });

  lab.test("POST / Should return authToken, - valid code", async () => {
    const options = {
      method: "POST",
      url: "/signupValidate",
      payload: {
        registerToken: "654321",
        code: "678901",
      },
    };
    const response = await server.inject(options);
    Code.expect(response.result.data.authToken).to.equal("MockGUIDAuthToken");
  });
});
