const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
    lecture_date: {
        type: Date,
        default: Date.now
    },
    teacher: {
        type: String,
    },
    group: {
        type: String,
    },
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    place: {
        type: String,
    }
});

const lectureModel = mongoose.model("tbl_lectures", LectureSchema);
module.exports = lectureModel;