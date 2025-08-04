const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String, 
    email: {type:String, unique: true},
    password: String,
    role: {type: String, enum:["student", "teacher", "admin"], default: "student"},
    gender: String,
    department: String,
    subject: String
})

module.exports = mongoose.model("User", userSchema);