const Router = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field_validator");
const { validateJWT, isAdminRole } = require("../middlewares");
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controller/product");
const { existCategoryById, existProductById } = require("../helpers/validators-bd");

const router = Router();

router.post('/', [
    validateJWT,
    check('name', 'El campo nombre es obligatorio').not().isEmpty(),
    check('category', 'Id de categoria no valido').isMongoId(),
    check('category').custom(existCategoryById),
    fieldValidator
], addProduct);

router.get('/', getProducts);

router.get('/:id',[
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existProductById),
    fieldValidator 
], getProduct);

router.put('/:id',[
    validateJWT,
   // check('cagtegory', 'Id de categoria no valido').isMongoId(),
    check('id').custom(existProductById),
    fieldValidator
], updateProduct);

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existProductById),
    fieldValidator
],deleteProduct)


module.exports = router;