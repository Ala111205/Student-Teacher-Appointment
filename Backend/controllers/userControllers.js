const User = require("../models/user");
const Appointment = require("../models/appointment");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");

exports.registerUser = async(req, res)=>{
    try {
        const {name, email, password, role, gender} = req.body;

        if(!name || !email || !password || !role || !gender){
            return res.status(400).json({message: "All fields are required"})
        }

        console.log(req.body);

        const hash = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already registered"});
        }
        
        const user = new User({name, email, password:hash, role, gender});
        await user.save();

        logger.info(`User registered: ${req.body.email}`);
        res.status(201).json(user)
    } catch (error) {
        logger.error(`User registered failed: ${error.message}`)
        res.status(400).json({message: error.message})
    }
};

exports.bookAppointment = async(req, res)=>{
    try {
        const {studentId, teacherId, date, time, purpose} = req.body;
        const appointment = new Appointment({studentId, teacherId, date, time, purpose});
        await appointment.save();
        res.status(201).json(appointment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}