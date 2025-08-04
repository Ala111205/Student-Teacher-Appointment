const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, required: true},
    subject: {type: String, required: true},
    department: String,
    approved: {type: Boolean, default: false}
});

module.exports = mongoose.model("student", studentSchema)