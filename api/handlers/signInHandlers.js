

async function getSigninStart(context, req) {
  console.log("This is the Request Body:", req.payload.email)
  if(req.payload.email === 'invalid@email.com') {
    console.log("The email was invalid!")
    return { code: 400 };
  }
  console.log("The email is valid")
  return { code: 200 };
  };

async function getSigninValidate(context, req) {
  return { operationId: context.operation.responses[200] };
};
  
  module.exports = { getSigninStart, getSigninValidate };