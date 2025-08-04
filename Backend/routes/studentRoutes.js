const express = require("express");
const router = express.Router();

const {addStudent, getStudent, updateStudent, deleteStudent, getApprovedStudent} = require("../controllers/studentControllers");

router.post("/create", addStudent);
router.get("/", getStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/approved", getApprovedStudent);

module.exports = router;