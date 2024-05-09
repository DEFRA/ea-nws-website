

async function getSigninStart(context, req) {
  console.log("Received SignInStart request for: ", req.payload)
  if(req.payload.email === 'invalid@email.com') {
    console.log("Invalid email, responding 500")
    return { statusCode: 500, signInToken: "" };
  }
  console.log("Valid email, responding 200")
  return { statusCode: 200, signInToken: "123456" };
  };

async function getSigninValidate(context, req) {
  console.log("Received SignInValidate request -- \n Code: ", req.payload.code, " - SignInToken: ", req.payload.signInToken)
  return { operationId: context.operation.responses[200] };
};
  
  module.exports = { getSigninStart, getSigninValidate };