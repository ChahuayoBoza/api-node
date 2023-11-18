const Router = require("express");
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controller/user");
const { check } = require("express-validator");
const Role = require('../models/role');

const { fieldValidator } = require("../middlewares/field_validator");
const { isRoleValidate, existEmail, existUserById} = require("../helpers/validators-bd");

const router = Router();

router.get("/",usersGet);

router.post("/", [
  check('email').custom(existEmail),
  check('email', 'El correo no es valido').isEmail(),
  check('name', 'El nombre no puede ser un campo vacio').not().isEmpty(),
  check('password', 'La constraseña debe de tener mas de 8 digitos').isLength({min: 8}),
  check('role').custom(isRoleValidate ),
  fieldValidator
], usersPost);

router.put("/:id", [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existUserById),
  check('role').custom(isRoleValidate),
  fieldValidator
], usersPut);

router.delete("/:id", [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existUserById),
  fieldValidator
], usersDelete);

module.exports = router;
