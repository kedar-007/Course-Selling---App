const { Router } = require("express");

const CourseRouter = Router();

CourseRouter.post("/purchase", (req, res) => {
    res.status(201).json({
        message:"Course Purchased"
    })
});

CourseRouter.get("/preview", (req, res) => {
    res.status(200),json({
        message:"Fetched the coursess"
    })
});

module.exports = ({
  CourseRouter,
});
