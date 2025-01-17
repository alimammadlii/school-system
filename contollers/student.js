const Student = require('../models/student')

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

module.exports = {registerStudent, loginStudent}