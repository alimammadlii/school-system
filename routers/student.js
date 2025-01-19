const express = require("express");
const router = express.Router();
const controller = require("../controllers/student.js"); 
const studentAuth = require("../middlewares/studentAuth.js");


router.post("/login", controller.loginStudent);
router.post("/register", controller.registerStudent);

router.get("/get-grades", studentAuth, controller.getStudentGrades);
router.get("/get-courses", studentAuth, controller.getStudentCourses);

module.exports = router;