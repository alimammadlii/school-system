const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Admin, Class, Teacher, Student } = require("../models");

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

const createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const { classID } = req.params 
    await Class.destroy({where: {id : classID}})
    return res.status(200).json({message: 'Class deleted succesfully'})
  } catch(err) {
    res.status(500).json({message : err.message})
  }
}
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClass = await Class.update(req.body, { where: { id } });
    res.status(200).json(updatedClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createTeacher = async (req, res) => {
  try {
    const newTeacher = await Teacher.create(req.body);
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTeacher = await Teacher.update(req.body, { where: { id } });
    res.status(200).json(updatedTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    await Teacher.destroy({ where: { id } });
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
}
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.update(req.body, { where: { id } });
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.destroy({ where: { id } });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const newCourse = await Student.create(req.body);
    res.status(201).json(newCourse)
  } catch(err) {
    res.statud(500).json({message: err})
  } 
}

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.update(req.body, { where: { id } });
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.destroy({ where: { id } });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerAdmin, 
  loginAdmin, 
  
  createClass,
  updateClass,
  deleteClass,

  createTeacher,
  updateTeacher,
  deleteTeacher,

  createStudent,
  updateStudent,
  deleteStudent,

  createCourse,
  updateCourse,
  deleteCourse
}