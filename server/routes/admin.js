const adminController = require("../controllers/adminController");
const router = require("express").Router();

router.post("/gadgets", adminController.addGadget);
router.post("/stores", adminController.addStore);

module.exports = router;
