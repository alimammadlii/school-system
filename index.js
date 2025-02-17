const express = require('express')
const app = express();
const apiRouter = require("./routers/index");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})