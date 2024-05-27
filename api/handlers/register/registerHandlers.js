"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseCodes = require('../responseCodes');
async function getRegisterStart(context, req, res) {
    console.log('Received register start request for: ', req.payload);
    const { email } = req.payload;
    if (email === 'emailAlreadyInUse@email.com') {
        console.log('Email already in Use, responding 101');
        return res.response(responseCodes.UNKNOWN_EMAIL).code(500);
    }
    console.log('Valid email, responding 200');
    return { code: 200, registerToken: '123456' };
}
async function getRegisterValidate(context, req, res) {
    console.log('Received register request --  ', req.payload);
    const { code, registerToken } = req.payload;
    if (code === '999999' || registerToken === '') {
        console.log('Invalid token');
        return res.response(responseCodes.INVALID_TOKEN).code(500);
    }
    console.log('Valid token');
    return { authToken: 'MockGUIDAuthToken' };
}
module.exports = { getRegisterStart, getRegisterValidate };
