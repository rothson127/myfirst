const userModel = require("./models/userModel");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const auth_login = async (req, res) => {
  let exist;
  try {
    exist = await userModel.findOne({ userid: req.body.userid });
  } catch (error) {
    return res
      .status(200)
      .send({ message: `${error.message}`, success: false });
  }

  if (!exist) {
    return res
      .status(200)
      .send({ message: "User not found with this userid.", success: false });
  }

  const hashedToken = crypto.createHash("md5").update(req.body.password).digest("hex");

  if (exist.password !== hashedToken) {
    return res
      .status(200)
      .send({ message: "Incorrect Password", success: false });
  }

  let token;
  try {
    token = jwt.sign({ userId: exist._id }, "secret_login", { expiresIn: "15m" });
  } catch (error) {
    return res
      .status(200)
      .send({ message: "Could not set token", success: false });
  }

  return res.status(200).send({
    message: "Login Successfull",
    success: true,
    user: exist,
    token: token,
  });
};

const auth_register = async (req, res) => {
  const {
    userid,
    password,
    username,
    birthday,
    group,
    unit,
    netkey_username,
    netkey_machinename,
    admissiondate,
    leavedate
  } = req.body;

  let exist;
  try {
    exist = await userModel.findOne({ userid: userid });
  } catch (error) {
    res.status(500).send({ message: `${error.message}`, success: false });
  }

  if (exist) {
    return res
      .status(200)
      .json({ message: "User already exists with this user id", success: false });
  }

  try {
    const hashedToken = crypto.createHash("md5").update(password).digest("hex");
    const newUser = new userModel({
      userid: userid,
      password: hashedToken,
      username: username,
      birthday: birthday,
      unit: unit,
      group: group,
      netkey_username: netkey_username,
      netkey_machinename: netkey_machinename,
      admissiondate: admissiondate,
      leavedate: leavedate,
      isadmin: 0,
    });

    await newUser.save();
    res.status(200).send({ message: "Register Success", success: true });
  } catch (error) {
    res.status(500).send({ message: `${error.message}`, success: false });
  }
};

const auth_getusers = async (req, res) => {
  try {
    const userList = await userModel.find({});
    if (userList) {
      res
        .status(200)
        .send({ userList });
    } else {
      res.status(500).send("Get User List Failed.");
      throw new Error("Get User List Failed.");
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Get User List Failed.", success: false });
  }
};

const auth_update = async (req, res) => {
  try {
    const newuser = await userModel.findById(req.body._id);
    if (newuser) {

      newuser.userid = req.body._data.userid;
      newuser.username = req.body._data.username;
      newuser.birthday = req.body._data.birthday;
      newuser.group = req.body._data.group;
      newuser.unit = req.body._data.unit;
      newuser.netkey_username = req.body._data.netkey_username;
      newuser.netkey_machinename = req.body._data.netkey_machinename;
      newuser.admissiondate = req.body._data.admissiondate;
      newuser.leavedate = req.body._data.leavedate;
      newuser.isadmin = req.body._data.isadmin;

      await newuser.save();
      res
        .status(200)
        .send({ success: true, message: "Member updated successfully", user: newuser });
    } else {
      res.status(500).send("Update member failed");
      throw new Error("Update member failed");
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Update member failed", success: false });
  }
};

const auth_remove = async (req, res) => {
  try {
    const member = await userModel.findByIdAndDelete(req.body._id);

    if (member) {
      res
        .status(200)
        .send({ message: "Member removed successfully",success: true });
    } else {
      res.status(200).send({ message: "Invalid Member data. ", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Invalid Member data. " + error, success: false });
  }
};

const auth_changepassword = async (req, res) => {
  try {
    const member = await userModel.findOne({ userid: req.body._id });
    if (member) {
      const hashedToken = crypto.createHash("md5").update(req.body.password).digest("hex");
      if (member.password === hashedToken) {
        member.password = crypto.createHash("md5").update(req.body.newpassword).digest("hex");
        await member.save();
        res.status(200).send({ message: "Change password has been succeed.", success: true });
      }
      else {
        res.status(200).send({ message: "Incorrect old password.", success: false });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: " Error occurred. " + error, success: false });
  }
}

module.exports = {
  auth_login,
  auth_register,
  auth_getusers,
  auth_remove,
  auth_update,
  auth_changepassword
};