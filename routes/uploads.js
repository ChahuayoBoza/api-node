const Router = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field_validator");
const { uploadArchive, updateImage, showImage } = require("../controller/uploads");
const { collectionsPermitted } = require("../helpers/validators-bd");
const { validateFileUpload } = require("../middlewares/file-validator");

const router = Router();

router.post('/', validateFileUpload, uploadArchive);

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'Id invalido').isMongoId(),
    check('collection').custom( c => collectionsPermitted ( c, ['users', 'products'] )),
    fieldValidator
], updateImage);

router.get('/:collection/:id', [
    check('id', 'Id invalido').isMongoId(),
    check('collection').custom( c => collectionsPermitted ( c, ['users', 'products'] )),
    fieldValidator
], showImage);

module.exports = router;