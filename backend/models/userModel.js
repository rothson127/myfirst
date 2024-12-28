const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "User ID is required"],
        unique: [true, "User ID Already Exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [8, "Too Weak. Not valid password. Longer than 7"],
    },
    username: {
        type: String,
        required: [true, "User Name is required"],
    },
    birthday: {
        type: Date,
        required: [true, "Birthday is required"],
    },
    admissiondate: {
        type: Date,
    },
    leavedate: {
        type: Date,
    },
    unit: {
        type: String,
    },
    group: {
        type: String,
    },
    netkey_username: {
        type: String,
    },
    netkey_machinename: {
        type: String,
    },
    isadmin: {
        type: Boolean,
    }
});

module.exports = mongoose.model("tbl_users", userSchema);
