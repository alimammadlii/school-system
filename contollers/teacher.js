const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Teacher } = require("../models");

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
    const newTeacher = await Admin.create({
      firstName,
      lastName,
      tc,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Admin registered successfully", newTeacher });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};

const loginTeacher = async (req, res) => {
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
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = {registerTeacher, loginTeacher}