const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    role: {type: String, required: true},
    department:{type: String, required: true},
    subject:{type: String, required: true},
    approved: {type: Boolean, default: false}
});

module.exports = mongoose.model("teacher", teacherSchema);