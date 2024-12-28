const express = require("express");
const jwt = require("jsonwebtoken");
const vocationModel = require("./models/vocationModel");

vocation_list = async (req, res) => {
  try {
    const vocations = await vocationModel.find({});
    if (!vocations) {
      return res
        .status(200)
        .send({ message: "Get vocation list failed", success: false });
    }
    res.status(200).json({ message:"Get vocation list success", success: true, data: vocations });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Get vocation list failed", success: false });
  }
};

vocation_add = async (req, res) => {
  const {
    username,
    startdate,
    enddate,
    reason
  } = req.body;
  try {
    const newvocation = await vocationModel.create({
      username,
      startdate,
      enddate,
      reason
    });
    if (newvocation) {
      res
        .status(200)
        .send({ success: true, message: "Vocation added successfully" });
    } else {
      res.status(200)
        .send({ success: false, message: "Invalid vocation data" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Invalid Lecture data", success: false });
  }
};

vocation_update = async (req, res) => {
  const {
    username,
    startdate,
    enddate,
    reason,
    _id,
  } = req.body;
  try {
    const vocation = await vocationModel.findById(_id);
    if (vocation) {
      vocation.username = username;
      vocation.startdate = startdate;
      vocation.enddate = enddate;
      vocation.reason = reason;
      await vocation.save();
      res
        .status(200)
        .send({ success: true, message: "Vocation updated successfully", vocation });
    } else {
      res.status(200).send({ message: "Invalid Vocation data", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Invalid Request", success: false });
  }
};

vocation_remove = async (req, res) => {
  const vocation = await vocationModel.findByIdAndDelete(req.body._id);
  if (!vocation) {
    res.status(200).json({ success: false, message: "Delete vocation failed" });
  }
  res.status(200).send({ success: true, message: "Lecture vocation succeed" });
};

module.exports = {
  vocation_list,
  vocation_add,
  vocation_update,
  vocation_remove
};
