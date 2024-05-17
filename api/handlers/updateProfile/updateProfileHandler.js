async function updateProfile(context, req) {
  return { operationId: context.operation.responses[200] }
}

module.exports = { updateProfile }
