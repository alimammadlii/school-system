const express = require('express')
require('dotenv').config

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({deneme: "Test deneme"})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})