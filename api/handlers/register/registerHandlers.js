async function getRegister(context, req){
    return { operationId: context.operation.responses[200] }
}

module.exports = {getRegister}