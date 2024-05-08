

async function getSigninStart(context, req) {
  if(req.payload.email === 'invalid@email.com') {
    console.log("The email was invalid!")
    return { code: 400 };
  }
  return { code: 200 };
  };

async function getSigninValidate(context, req) {
  return { operationId: context.operation.responses[200] };
};
  
  module.exports = { getSigninStart, getSigninValidate };