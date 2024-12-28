const express = require("express");
const router = express.Router();
const vocationController = require("./vocationController");

router.use("/list", vocationController.vocation_list);
router.post("/add", vocationController.vocation_add);
router.post("/update", vocationController.vocation_update);
router.post("/remove", vocationController.vocation_remove);

module.exports = router;