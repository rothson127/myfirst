const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User Name is required"],
    },
    project: {
        type: String,
        required: [true, "Birthday is required"],
    },
    stack: {
        type: String,
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    startdate:{
        type: Date,
    },
    enddate: {
        type:Date,
    },
});

module.exports = mongoose.model("tbl_tasks", taskSchema);
