const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const requestLogger = require("./middelWares/requestLogger");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(requestLogger);


const MONGO_URI = "mongodb://localhost:27017/StudentTeacherDB";
console.log("MONGO_URI is:", MONGO_URI);

mongoose.connect(MONGO_URI)
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

const port = process.env.PORT || 4000;
app.listen(port, ()=>{console.log(`Server running on ${port}`)})