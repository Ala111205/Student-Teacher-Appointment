const Teacher = require("../models/teacher");
const logger = require("../utils/logger");

exports.addTeacher = async (req, res)=>{
    try {
        const teacher = await new Teacher(req.body);
        await teacher.save();

        logger.info(`Teacher registered: ${req.body.email}`)
        res.status(201).json({message: "Teacher registered successfully"})
    } catch (error) {
        logger.error(`Teacher registered failed: ${error.message}`)
        res.status(400).json({error: error.message})
    }
};

exports.getTeacher = async (req,res)=>{
    try {
        const teacher = await Teacher.find();
        res.json(teacher)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

exports.updateTeacher = async (req,res)=>{
    try {
        console.log("Updating teacher with ID: ", req.params.id);
        console.log("Update Payload: ", req.body)
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json({message: "Teacher updated successfully", teacher});
    } catch (error) {
       res.status(400).json({error: error.message}) 
    }
};

exports.deleteTeacher = async (req, res)=>{
    try {
        await Teacher.findByIdAndDelete(req.params.id);
        res.json({message: "Teacher deleted successfully"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

exports.getApprovedTeacher = async (req, res)=>{
    try {
        const teacher = await Teacher.find({approved: true});
        res.json(teacher);
    } catch (error) {
        res.status(400).json({message: "Fetching approved teachers", error: error.message})
    }
}