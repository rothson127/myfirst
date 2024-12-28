const express = require("express");
const router = express.Router();
const taskController = require("./taskController");

router.use("/list", taskController.task_list);
router.post("/add", taskController.task_add);
router.post("/update", taskController.task_update);
router.post("/remove", taskController.task_remove);

module.exports = router;