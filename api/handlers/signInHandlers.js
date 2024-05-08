async function getSigninStart(context, req) {
    return { operationId: context.operation.responses[200] };
  };

async function getSigninValidate(context, req) {
  return { operationId: context.operation.responses[200] };
};
  
  module.exports = { getSigninStart, getSigninValidate };