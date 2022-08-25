const express = require("express");
const  router = express.Router();
const Authentications = require('../middleware/authentication');
const productCodeController = require("../controll/ProductCodesControll");

router.get("/all",Authentications,productCodeController.getList);
router.post("/index",Authentications,productCodeController.index);
router.post("/store",Authentications,productCodeController.store);

module.exports = router;    