const dbValidator  = require('./validators-bd');
const googleVerify = require('./google-verfy');
const jwtGenerator = require('./generate-jwt');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidator,
    ...googleVerify,
    ...jwtGenerator,
    ...uploadFile
}