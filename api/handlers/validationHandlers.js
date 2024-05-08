async function validationFail(context, req){
    return {err : context.validation.errors, code: 404}
}

async function notFound(context, req){
    return {context, err: 'Not found', code: 404}
}

module.exports = { validationFail, notFound };
