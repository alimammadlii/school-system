const express = require("express");
const router = express.Router();
const teacherAuth = require("../middlewares/teacherAuth.js");
const controller = require("../controllers/teacher.js");


router.post("/register", controller.registerTeacher);
router.post("/login", controller.loginTeacher);

router.post("/assign-grade", teacherAuth, controller.assignGradeToStudent);
router.post("/update-grades", teacherAuth, controller.updateStudentGrades);
router.get("/get-grades", teacherAuth, controller.getStudentGrades);

module.exports = router;
