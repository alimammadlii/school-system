const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token> seklinde oldugu icin
  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

const verifyRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

const generateToken = (user, role) => {
  return jwt.sign(
    { id: user.id, role }, 
    process.env.JWT_SECRET, 
    { expiresIn: "1h" } 
  );
};


module.exports = {verifyRole, verifyToken, generateToken}