async function updateProfile(context, req) {
  console.log('payload', req.payload)
  return { operationId: context.operation.responses[200] }
}

module.exports = { updateProfile }
