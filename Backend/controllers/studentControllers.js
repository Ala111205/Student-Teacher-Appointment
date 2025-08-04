const Student = require("../models/student");
const logger = require("../utils/logger");

exports.addStudent = async (req, res)=>{
    try {
        const student = await new Student(req.body);
        await student.save();

        logger.info(`Student created: ${req.body.email}`);
        res.status(201).json({message: "Student created successfully"})
    } catch (error) {
        logger.error(`Student registered failed: ${error.message}`)
        res.status(400).json({error: error.message});
    }
}

exports.getStudent = async (req, res)=>{
    try {
        const student = await Student.find();
        res.json(student);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.updateStudent = async (req, res)=>{
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({message: "Student updated successfully", student})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

exports.deleteStudent = async (req, res)=>{
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Student deleted successfully"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

exports.getApprovedStudent = async (req, res)=>{
    try {
        const student = await Student.find({approved: true});
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({message: "Fetching Approved students", error: error.message})
    }
}