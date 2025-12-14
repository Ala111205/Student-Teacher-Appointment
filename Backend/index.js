require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const requestLogger = require("./middelWares/requestLogger");

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://student-teacher-appointment-green.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(requestLogger);

// MongoDB connection function with auto-reconnect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // try for 5s
      socketTimeoutMS: 45000          // close sockets after 45s idle
    });
    console.log("✅ MongoDB connected...");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("🔄 Retrying MongoDB connection in 5 seconds...");
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

// Listen for disconnects and try to reconnect
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected! Attempting to reconnect...");
  connectDB();
});

// Start initial connection
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/admins", adminRoutes);

app.get("/", (req, res) => {
  res.send("Student-Teacher Appointment Booking API is running...");
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));