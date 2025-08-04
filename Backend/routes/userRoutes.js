const express = require("express");
const router = express.Router();

const {registerUser, bookAppointment} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/book", bookAppointment);

module.exports = router;