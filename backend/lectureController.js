const express = require("express");
const lecturerouter = express.Router();
const jwt = require("jsonwebtoken");
const lectureModel = require("./models/lectureModel");

lecture_getlectures = async (req, res) => {
  try {
    const lectures = await lectureModel.find({});
    if (!lectures) {
      res.status(400).send("No lectures found");
      throw new Error("No lectures found");
    }
    res.status(200).json({ lectures });
  } catch (error) {
    return res
      .status(404)
      .send({ message: "Get lecture list failed", success: false });
  }
};

lecture_add = async (req, res) => {
  const {
    lecture_date,
    teacher,
    group,
    title,
    desc,
    place
  } = req.body;
  try {
    const newlecture = await lectureModel.create({
      lecture_date,
      teacher,
      group,
      title,
      desc,
      place
    });

    if (newlecture) {
      res
        .status(200)
        .send({ success: true, message: "Lecture added successfully" });
    } else {
      res.status(400).send("Invalid Lecture data");
      throw new Error("Invalid Lecture data");
    }
  } catch (error) {
    return res
      .status(404)
      .send({ message: "Invalid Lecture data", success: false });
  }
};

lecture_update = async (req, res) => {
  const {
    lecture_date,
    teacher,
    group,
    title,
    desc,
    place,
    _id,
  } = req.body;
  try {
    const lecture = await lectureModel.findById(_id);
    if (lecture) {
      lecture.lecture_date = lecture_date;
      lecture.teacher = teacher;
      lecture.group = group;
      lecture.title = title;
      lecture.desc = desc;
      lecture.place = place;
      await lecture.save();
      res
        .status(200)
        .send({ success: true, message: "Lecture updated successfully", lecture });
    } else {
      res.status(404).send("Invalid Lecture data");
      throw new Error("Invalid Lecture data");
    }
  } catch (error) {
    return res
      .status(404)
      .send({ message: "Invalid Lecture data", success: false });
  }
};

lecture_remove = async (req, res) => {
  const lecture = await lectureModel.findByIdAndDelete(req.body._id);
  if (!lecture) {
    res.status(404).json({ success: false, message: "Delete Lecture failed" });
  }
  res.status(200).send({ success: true, message: "Lecture Delete Succeed" });
};

module.exports = {
  lecture_getlectures,
  lecture_add,
  lecture_remove,
  lecture_update
};
