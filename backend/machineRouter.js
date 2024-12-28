const express = require("express");
const router = express.Router();
const machineController = require("./machineController");

router.use("/getmachines", machineController.machine_getmachines);
router.post("/add", machineController.machine_add);
router.post("/update", machineController.machine_update);
router.post("/remove", machineController.machine_remove);

module.exports = router;