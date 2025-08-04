const express = require("express");
const router = express.Router();

const {addTeacher, getTeacher, updateTeacher, deleteTeacher, getApprovedTeacher} = require("../controllers/teacherControllers");

router.post("/create", addTeacher);
router.get("/", getTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);
router.get("/approved", getApprovedTeacher);

module.exports = router;