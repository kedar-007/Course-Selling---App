const { Router } = require("express");
const adminRouter = Router();

// all admin routes
adminRouter.post("/signup", (req, res) => {
    res.status(201).json({
        message: "Sighnup Successfully"
    })

})


adminRouter.post("/signin", (req, res) => {

    res.status(201).json({
        message: "Signin Successfully"
    })
})

adminRouter.post("/course", (req, res) => {
    res.status(200).json({
        message: "You Purchased Courses Here"
    })
})


adminRouter.get("/courses/bulk", (req, res) => {
    res.status(200).json({
        message: "You Purchased Courses Here"
    })
})


module.exports = {
    adminRouter: adminRouter
}