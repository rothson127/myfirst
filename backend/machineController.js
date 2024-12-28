const express = require("express");
const machineRouter = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");
const machineModel = require("./models/machineModel");

const machine_getmachines = async (req, res) => {
  try {

    const machines = await machineModel.find({}).populate('userid');


    if (!machines) {
      res.status(200).send({ message: "No machines found", success: false });
      return;
    }

    const formattedResults = machines.map(machine => (
      machine.userid ?
        {
          _id: machine._id,
          type: machine.type,
          brand: machine.brand,
          spec: machine.spec,
          serial: machine.serial,
          user: machine.user,
          owner: machine.owner,
          rb: machine.rb,
          fault: machine.fault,
          reason: machine.reason,
          userid_id: machine.userid._id,
          userid_userid: machine.userid.userid,
          userid_username: machine.userid.username,
          userid_birthday: machine.userid.birthday,
          userid_unit: machine.userid.unit,
          userid_netkey_username: machine.userid.netkey_username,
          userid_netkey_machinename: machine.userid.netkey_machinename,
          userid_group: machine.userid.group,
        } : {
          _id: machine._id,
          type: machine.type,
          brand: machine.brand,
          spec: machine.spec,
          serial: machine.serial,
          user: machine.user,
          owner: machine.owner,
          rb: machine.rb,
          fault: machine.fault,
          reason: machine.reason,
        }));
    res.status(200).send({ message: "Get Machine List Succeed", success: true, machines: formattedResults });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "No machines found", success: false });
  }

};

const machine_add = async (req, res) => {
  const {
    userid_id,
    type,
    brand,
    spec,
    serial,
    user,
    owner,
    rb,
    fault,
    reason,
  } = req.body;

  console.log(userid_id);
  try {
    const newmachines = await machineModel.create({
      userid_id,
      type,
      brand,
      spec,
      serial,
      user,
      owner,
      rb,
      fault,
      reason,
    });
    newmachines.userid = userid_id;
    await newmachines.save();
    if (newmachines) {
      res
        .status(200)
        .send({ success: true, message: "Machine added successfully" });
    } else {
      res.status(200).send({ success: false, message: "Invalid machine data" });

    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Invalid machine data", success: false });
  }

};

const machine_update = async (req, res) => {
  try {
    const machines = await machineModel.findById(req.body._id);
    if (machines) {
      machines.userid = req.body.userid_id;
      machines.type = req.body.type;
      machines.brand = req.body.brand;
      machines.spec = req.body.spec;
      machines.serial = req.body.serial;
      machines.user = req.body.user;
      machines.owner = req.body.owner;
      machines.rb = req.body.rb;
      machines.fault = req.body.fault;
      machines.reason = req.body.reason;
      await machines.save();
      const retdata = await machines.populate('userid');

      res
        .status(200)
        .send({ success: true, message: "Machine updated successfully", newmachine: retdata });
    } else {
      res.status(200).send({ success: false, message: "Invalid machine data" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Invalid machine data", success: false });
  }
};

const machine_remove = async (req, res) => {
  const machine = await machineModel.findByIdAndDelete(req.body._id);
  if (!machine) {
    res.status(404).json({ success: false, message: "Machine delete failed" });
  }
  res.status(200).send({ success: true, message: "Machine Sucessfully Deleted" });
};


module.exports = {
  machine_getmachines,
  machine_add,
  machine_remove,
  machine_update
};