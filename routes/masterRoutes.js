const express = require("express");
const  router = express.Router();
const upload = require("../middleware/upload");
const Authentications = require('../middleware/authentication');
const productController = require("../controll/productMasterControll");


router.post("/index",Authentications,productController.index);
router.post("/store",Authentications,upload.single('Image'),productController.store);
router.put("/update",Authentications,upload.single('Image'),productController.update);
router.get("/all",Authentications,productController.getList);
router.delete("/destroy",Authentications,productController.destroy);


module.exports = router;    