const responseCodes = require('../responseCodes')

async function getRegisterStart(context, req) {
  console.log("Received register start request for: ", req.payload);
  if (req.payload.email === "emailAlreadyInUse@email.com") {
    console.log("Email already in Use, responding 101");
    return responseCodes.UNKNOWN_EMAIL
  }
  console.log("Valid email, responding 200");
  return { ...responseCodes.SUCCESS, registerToken: "123456" };
}

async function getRegisterValidate(context, req) {
  console.log(
    "Received register request -- \n Code: ",
    req.payload.code,
    " - RegisterToken: ",
    req.payload
  );
  if (req.payload.code === "999999"|| req.payload.registerToken === undefined)  {
    console.log("Invalid token");
    return responseCodes.INVALID_TOKEN
  }
  console.log("Valid token");

  return { authToken: "MockGUIDAuthToken" };
}

module.exports = { getRegisterStart, getRegisterValidate };
