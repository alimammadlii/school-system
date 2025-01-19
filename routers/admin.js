const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth.js");
const controller = require("../controllers/admin.js"); 


router.post("/register", controller.registerAdmin);
router.post("/login", controller.loginAdmin);

router.post("/create-class", adminAuth, controller.createClass);
router.delete("/delete-class",adminAuth, controller.deleteClass);
router.post("/update-class", adminAuth, controller.updateClass);

router.post("/create-teacher", adminAuth, controller.createTeacher);
router.delete("/delete-teacher",adminAuth, controller.deleteTeacher);
router.post("/update-teacher", adminAuth, controller.updateTeacher);

router.post("/create-student", adminAuth, controller.createStudent);
router.delete("/delete-student",adminAuth, controller.deleteStudent);
router.post("/update-student", adminAuth, controller.updateStudent);

router.post("/create-course", adminAuth, controller.createCourse);
router.delete("/delete-course",adminAuth, controller.deleteCourse);
router.post("/update-course", adminAuth, controller.updateCourse);

module.exports = router;