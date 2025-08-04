const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    teacherId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    date: String,
    time: String,
    purpose: String,
    status: {type: String, enum:["pending", "approved", "cancelled"], def: "pending"}
});

module.exports = mongoose.model("Appointment" ,appointmentSchema)