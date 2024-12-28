const mongoose = require("mongoose");

const vocationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User name is required"],
    },
    startdate: {
        type: Date,
        required: [true, "Start Date is required"],
    },
    enddate: {
        type: Date,
        required: [true, "End Date is required"],
    },
    reason: {
        type: String,
    }
});

module.exports = mongoose.model("tbl_vocations", vocationSchema);
