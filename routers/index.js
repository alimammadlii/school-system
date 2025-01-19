const express = require("express");
const router = express.Router();

const adminRouter = require("./admin");
const studentRouter = require("./student");
const teacherRouter = require("./teacher");

router.get("/", (req, res) => {
    res.send("api");
});

router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/admin", adminRouter);

module.exports = router;