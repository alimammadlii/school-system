const {Student, Grade, Course} = require("../models")

const registerStudent = async (req, res) => {
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
        res.status(500).json({message: err})
    }
}

const loginStudent = async (req, res) => {
    const {studentNo, password} = req.body;
    try {
        user = await Student.findOne({where : {studentNo: studentNo}})
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
    
        // Token oluştur
        const token = generateToken(user, role);
        res.status(200).json({ message: "Login successful", token });
    }catch (err) {
        res.status(500).json({message:err})
    }
}

const getStudentGrades = async (req, res) => {
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
      res.status(500).json({ message: err.message });
    }
};

const getStudentCourses = async (req, res) => {
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
      res.status(500).json({ message: err.message });
    }
};

module.exports = {
  registerStudent,
  loginStudent,
  getStudentGrades,
  getStudentCourses
}