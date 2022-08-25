const express = require("express");
const  router = express.Router();
const Authentications = require('../middleware/authentication'); 
const AuthController = require("../controll/Authcontroll");

router.post("/users",AuthController.getuser);
router.post("/register",AuthController.registor);
router.delete("/destroy",Authentications,AuthController.destroy);
router.post("/login",AuthController.login);

module.exports = router;    