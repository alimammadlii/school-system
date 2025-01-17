const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Admin } = require("../models");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const registerAdmin = async (req, res, next) => {
  const { firstName, lastName, tc, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      firstName,
      lastName,
      tc,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};

const loginAdmin = async (req, res) => {
  const { tc, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { tc } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(admin);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = {registerAdmin, loginAdmin}