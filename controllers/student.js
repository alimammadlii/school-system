const {Student, Grade, Course} = require("../models")
const CustomError = require('../error/customError');

const registerStudent = async (req, res, next) => {
    const {firstName, lastName, studentNo, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = await Student.create({
            firstName,
            lastName,
            studentNo,
            password: hashedPassword
        })
        res.status(201).json({message: "Yeni ogrenci olusturuldu"})
    } catch (err) {
      next(new CustomError(err.message));
    }
}

const loginStudent = async (req, res, next) => {
    const {studentNo, password} = req.body;
    try {
        user = await Student.findOne({where : {studentNo: studentNo}})
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          next(new CustomError(err.message));
        }
    
        // Token oluştur
        const token = generateToken(user, role);
        res.status(200).json({ message: "Login successful", token });
    }catch (err) {
      next(new CustomError(err.message));
    }
}

const getStudentGrades = async (req, res, next) => {
    try {
      const { id } = req.user; //JWT
      const grades = await Grade.findAll({
        where: { studentId: id },
        include: [
          {
            model: Course,
            attributes: ['courseName'],
          },
        ],
      });
  
      if (!grades.length) {
        return res.status(404).json({ message: 'No grades found for this student' });
      }
  
      res.status(200).json(grades);
    } catch (err) {
      next(new CustomError(err.message));
    }
};

const getStudentCourses = async (req, res, next) => {
    try {
      const { id } = req.user; //JWT
      const student = await Student.findByPk(id, {
        include: [
          {
            model: Course,
            attributes: ['id', 'courseName', 'teacherId'],
          },
        ],
      });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(student.Courses);
    } catch (err) {
      next(new CustomError(err.message));
    }
};

module.exports = {
  registerStudent,
  loginStudent,
  getStudentGrades,
  getStudentCourses
}