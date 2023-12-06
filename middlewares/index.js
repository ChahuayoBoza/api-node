const validateField= require("../middlewares/field_validator");
const validateJWT = require('../middlewares/jwt-validator');
const validateRole = require("../middlewares/role-validator");
const validateFile = require("../middlewares/file-validator");

module.exports = {
    ...validateField,
    ...validateJWT,
    ...validateRole,
    ...validateField
}