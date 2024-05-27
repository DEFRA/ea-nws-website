"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseCodes = require('../responseCodes');
async function getUpdateProfile(context, req) {
    console.log('payload', req.payload);
    return { ...responseCodes.SUCCESS, Desc: 'It works' };
}
module.exports = { getUpdateProfile };
