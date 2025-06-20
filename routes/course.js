const { Router } = require("express");

const CourseRouter = Router();

CourseRouter.post("/purchase", (req, res) => {});

CourseRouter.post("/preview", (req, res) => {});

module.exports({
  CourseRouter,
});
