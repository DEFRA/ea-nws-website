"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseCodes = require('../../../responseCodes');
async function getMobileStart(context, req, res) {
    const { authToken } = req.payload;
    const { msisdn } = req.payload;
    // 200 Success
    if (authToken === 'MockGUIDAuthToken') {
        return res.response(responseCodes.SUCCESS);
    }
    else {
        return res.response(responseCodes.INVALID_TOKEN).code(500);
    }
}
async function getMobileValidate(context, req, res) {
    const { authToken } = req.payload;
    const { msisdn } = req.payload;
    const { code } = req.payload;
    // 200 Success
    if (code === '123456') {
        return res.response(responseCodes.SUCCESS);
    }
    else {
        return res.response(responseCodes.INVALID_CODE).code(500);
    }
}
module.exports = { getMobileStart, getMobileValidate };
