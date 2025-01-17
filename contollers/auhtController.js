const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Admin, Teacher, Student } = require("../models"); // Modeller
const generateToken = require("../middlewares/auth")


// Register işlemleri
exports.registerAdmin = async (req, res) => {
  const { firstName, lastName, tc, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      firstName,
      lastName,
      tc,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Yeni mudur olusturuldu", newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};


exports.registerTeacher = async (req, res) => {
    const {firstName, lastName, tc, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newTeacher = await Teacher.create({
            firstName,
            lastName,
            tc,
            password: hashedPassword
        });
        res.status(201).json({message: "Yeni ogretmen olusturuldu", newTeacher})
    } catch(err) {
        res.status(500).json({message: "Error", err})
    }
}

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



exports.login = async (req, res) => {
  const { identifier, password, role } = req.body; // tc ve studentNo olarak ayrildigindan identifier kullanip ona gore kontrol edilecek

  try {
    let user, Model;
    // Role'e göre model belirle
    if (role === "admin") {
      Model = Admin;
      user = await Model.findOne({ where: { tc: identifier } });
    } else if (role === "teacher") {
      Model = Teacher;
      user = await Model.findOne({ where: { tc: identifier } });
    } else if (role === "student") {
      Model = Student;
      user = await Model.findOne({ where: { studentNo: identifier } });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    
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
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
