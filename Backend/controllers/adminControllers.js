const Students = require("../models/student");
const Teachers = require("../models/teacher");
const logger = require("../utils/logger");

// ✅ Get all pending students and teachers
exports.getPendingUsers = async (req, res) => {
    try {
        const [students, teachers] = await Promise.all([
            Students.find({ approved: false }),
            Teachers.find({ approved: false }),
        ]);

        res.json({ students, teachers });
    } catch (error) {
        logger.error("Failed to fetch pending users:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// ✅ Approve student or teacher by type and ID
exports.approveUser = async (req, res) => {
    const { type, id } = req.params;

    try {
        let user;

        if (type === "student") {
            user = await Students.findByIdAndUpdate(id, { approved: true }, { new: true });
        } else if (type === "teacher") {
            user = await Teachers.findByIdAndUpdate(id, { approved: true }, { new: true });
        } else {
            return res.status(400).json({ error: "Invalid user type" });
        }

        if (!user) {
            logger.warn(`No ${type} found with ID: ${id}`);
            return res.status(404).json({ error: `${type} not found` });
        }

        logger.info(`${type} approved with ID: ${id}`);
        res.json({ message: `${type} approved`, user });
    } catch (error) {
        logger.error(`Approval failed for ${type} ID ${id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete student or teacher by type and ID
exports.deleteUser = async (req, res) => {
    const { type, id } = req.params;

    try {
        let result;

        if (type === "student") {
            result = await Students.findByIdAndDelete(id);
        } else if (type === "teacher") {
            result = await Teachers.findByIdAndDelete(id);
        } else {
            return res.status(400).json({ error: "Invalid user type" });
        }

        if (!result) {
            return res.status(404).json({ error: `${type} not found` });
        }

        res.json({ message: `${type} deleted successfully` });
    } catch (error) {
        logger.error(`Failed to delete ${type} ID ${id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
