const { Router } = require("express");
const {userMiddleware} = require("../middlewares/user")
const{ purchaseModel, courseModel } = require("../db")

const CourseRouter = Router();

CourseRouter.post("/purchase",userMiddleware,async(req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const purchase = await purchaseModel.create({
        userId,
        courseId
    })
    if(!purchase){
        return res.status(403).json({
            message:"Unable to Purchase",
        })
    }

    res.status(201).json({
        message:"Course Purchased",
        data:purchase
    })
});

CourseRouter.get("/preview", (req, res) => {
    res.status(200),json({
        message:"Fetched the coursess"
    })
});

CourseRouter.get("/purchases",userMiddleware,async (req, res) => {
    const userId = req.userId;
    const purchased = await purchaseModel.find({userId});
    const courses = await courseModel.find({_id:{$in:purchased.map(x => x.courseId)}})

    res.status(200).json({
        message:"Fetched the coursess",
        courses: purchased,
        content: courses
    })
});


module.exports = ({
  CourseRouter,
});
