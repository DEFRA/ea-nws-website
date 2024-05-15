async function getContactDetails(context, req) {
  return { operationId: context.operation.responses[200] };
}

module.exports = { getContactDetails };
