const express = require("express");
const router = express.Router();
const authController = require("./authController");

router.post("/login", authController.auth_login);
router.post("/register", authController.auth_register);
router.use("/getusers", authController.auth_getusers);
router.post("/update", authController.auth_update);
router.post("/remove", authController.auth_remove);
router.post("/changepassword", authController.auth_changepassword);

module.exports = router;