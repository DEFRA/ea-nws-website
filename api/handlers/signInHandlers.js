

async function getSigninStart(context, req) {
  if(req.payload.email === 'invalid@email.com') {
    return { code: 500 };
  }
  return { code: 200, signInToken: "123456" };
  };

async function getSignInValidate(context, req) {
  return { operationId: context.operation.responses[200] };
};
  
  module.exports = { getSigninStart, getSignInValidate };