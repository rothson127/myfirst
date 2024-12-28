
const mongoose = require('mongoose');

const MachineSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_users",
    },
    type: {
        type: String,
    },
    brand: {
        type: String,
    },
    spec: {
        type: String,
    },
    serial: {
        type: String,
    },
    user: {
        type: String,
    },
    owner: {
        type: String,
    },
    rb: {
        type: String,
    },
    fault: {
        type: String,
    },
    reason: {
        type: String,
    }
});

module.exports = mongoose.model("tbl_machines", MachineSchema);