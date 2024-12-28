const express = require("express");
const jwt = require("jsonwebtoken");
const taskModel = require("./models/taskModel");

task_list = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    if (!tasks) {
      return res
        .status(200)
        .send({ message: "Get task list failed", success: false });
    }
    res.status(200).json({ message: "Get task list success", success: true, data: tasks });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Get task list failed", success: false });
  }
};

task_add = async (req, res) => {
  const {
    username,
    project,
    stack,
    price,
    description,
    url,
    startdate,
    enddate,
  } = req.body;
  try {
    const newtask = await taskModel.create({
      username,
      project,
      stack,
      price,
      description,
      url,
      startdate,
      enddate,
    });
    if (newtask) {
      res
        .status(200)
        .send({ success: true, message: "task added successfully" });
    } else {
      res.status(200)
        .send({ success: false, message: "Invalid task data" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Invalid Task data", success: false });
  }
};

task_update = async (req, res) => {
  const {
    username,
    project,
    stack,
    price,
    description,
    url,
    startdate,
    enddate,
    _id
  } = req.body;
  try {
    const task = await taskModel.findById(_id);
    if (task) {
      task.username = username;
      task.project = project;
      task.stack = stack;
      task.price = price;
      task.description = description;
      task.url = url;
      task.startdate = startdate;
      task.enddate = enddate;
      await task.save(); 
      res
        .status(200)
        .send({ success: true, message: "task updated successfully", task: task });
    } else {
      res.status(200).send({ message: "Invalid task data", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Invalid Request", success: false });
  }
};

task_remove = async (req, res) => {
  const task = await taskModel.findByIdAndDelete(req.body._id);
  if (!task) {
    res.status(200).json({ success: false, message: "Delete task failed" });
  }
  res.status(200).send({ success: true, message: "Task task succeed" });
};

module.exports = {
  task_list,
  task_add,
  task_update,
  task_remove
};
