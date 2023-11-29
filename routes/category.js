const Router = require("express");
const { check } = require("express-validator");
const { login, loginGoogle } = require("../controller/auth");
const { fieldValidator } = require("../middlewares/field_validator");
const { validateJWT, isAdminRole } = require("../middlewares");
const { addCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controller/category");
const { existCategoryById } = require("../helpers/validators-bd");

const router = Router();

router.post('/', [
    validateJWT,
    check('name', 'El campo nombre es obligatorio').not().isEmpty(),
    fieldValidator
], addCategory);

router.get('/', getCategories);

router.get('/:id',[
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existCategoryById),
    fieldValidator 
], getCategory);

router.put('/:id',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existCategoryById),
    fieldValidator
], updateCategory);

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existCategoryById),
    fieldValidator
],deleteCategory)




module.exports = router;