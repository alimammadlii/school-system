const express = require('express')
require('dotenv').config
const authRoutes = require("./routes/authRoutes")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})