const express = require("express");
const router = express.Router();
const {
    getPendingUsers,
    approveUser,
    deleteUser,
} = require("../controllers/adminControllers");

// GET: All pending students and teachers
router.get("/pending", getPendingUsers);

// PUT: Approve by type and ID
router.put("/approved/:type/:id", approveUser);

// DELETE: Delete by type and ID
router.delete("/:type/:id", deleteUser);

module.exports = router;
