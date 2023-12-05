const Router = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field_validator");
const { uploadArchive } = require("../controller/uploads");

const router = Router();

router.post('/', uploadArchive);

module.exports = router;