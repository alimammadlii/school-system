const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Teacher, Grade, Course, Student} = require("../models");
const CustomError = require("../error/customError")

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const registerTeacher = async (req, res, next) => {
  const { firstName, lastName, tc, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = await Teacher.create({
      firstName,
      lastName,
      tc,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Teacher registered successfully", newTeacher });
  } catch (error) {
    next(new CustomError(err.message));
  }
};

const loginTeacher = async (req, res, next) => {
  const { tc, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ where: { tc } });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(teacher);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(new CustomError(err.message));
  }
};

const assignGradeToStudent = async (req, res, next) => {
  try {
    const { studentId, courseId, grade } = req.body;

    const student = await Student.findByPk(studentId);
    const course = await Course.findByPk(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: 'Student or Course not found' });
    }

    const newGrade = await Grade.create({
      studentId,
      courseId,
      grade,
    });

    res.status(201).json({ message: 'Grade assigned successfully', newGrade });
  } catch (error) {
    next(new CustomError(err.message));
  }
};


const updateStudentGrade = async (req, res, next) => {
  try {
    const { studentId, courseId, grade } = req.body;

    const gradeRecord = await Grade.findOne({ where: { studentId, courseId } });
    if (!gradeRecord) {
      return res.status(404).json({ message: 'Grade record not found' });
    }

    await gradeRecord.update({ grade });
    res.status(200).json({ message: 'Grade updated successfully', gradeRecord });
  } catch (error) {
    next(new CustomError(err.message));;
  }
};


const getStudentGrades = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const grades = await Grade.findAll({ where: { studentId } });
    if (!grades.length) {
      return res.status(404).json({ message: 'No grades found for this student' });
    }

    res.status(200).json(grades);
  } catch (error) {
    next(new CustomError(err.message));
  }
};


module.exports = {
  registerTeacher,
  loginTeacher,
  assignGradeToStudent,
  updateStudentGrade,
  getStudentGrades
}