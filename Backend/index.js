require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const requestLogger = require("./middelWares/requestLogger");

const app = express();

app.use(cors({
  origin:"https://student-teacher-appointment-green.vercel.app/", // add Vercel domain here
  credentials: true
}));

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(requestLogger);


console.log("📌 Fetching pending users from DB...");
console.log("Mongo URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.log(error));

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

const port = process.env.PORT || 4000;
app.listen(port, ()=>{console.log(`Server running on ${port}`)})