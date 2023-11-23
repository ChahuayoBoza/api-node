const Router = require("express");
const { check } = require("express-validator");
const { login } = require("../controller/auth");
const { fieldValidator } = require("../middlewares/field_validator");

const router = Router();

router.post('/login', [
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldValidator
], login );

module.exports = router;