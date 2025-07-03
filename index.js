const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const student = require("./router/students");
const enrollments = require("./router/enrollments");
const courses = require("./router/courses");
const attendance = require("./router/attendance");
const departments = require("./router/departments");
const grades = require("./router/grades");
const instructors = require("./router/instructors");
const authRoutes = require("./auth/authRoutes");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = 4000;
app.use("/student",student);
app.use("/enrollments",enrollments);
app.use("/courses",courses);
app.use("/departments",departments);
app.use("/attendance",attendance);
app.use("/grades",grades);
app.use("/instructors",instructors);
app.use("/api/auth", authRoutes);


app.listen(port, () => console.log("Server running on port " + port))