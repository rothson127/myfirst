const express = require("express");
const router = express.Router();
const lectureController = require("./lectureController");

router.use("/getlectures", lectureController.lecture_getlectures);
router.post("/add", lectureController.lecture_add);
router.post("/update", lectureController.lecture_update);
router.post("/remove", lectureController.lecture_remove);

module.exports = router;