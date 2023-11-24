const Router = require("express");
const { check } = require("express-validator");
const { login, loginGoogle } = require("../controller/auth");
const { fieldValidator } = require("../middlewares/field_validator");

const router = Router();

router.post('/login', [
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldValidator
], login );

router.post('/login-google', [
    check('id_token', 'ID_Token de google necesario').not().isEmpty(),
    fieldValidator
], loginGoogle );




module.exports = router;