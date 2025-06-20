
const { Router } = require('express');

const UserRouter = Router();


UserRouter.post("/signup",(req,res)=>{
    res.status(201).json({
        message:"Sighnup Successfully"
    })
    
})
    
    
UserRouter.post("/signin",(req,res)=>{

    res.status(201).json({
        message:"Signin Successfully"
    })
})
    
    
UserRouter.get("/purchases",(req,res)=>{
    res.status(200).json({
        message:"You Purchased Courses Here"
    })
})


module.exports = ({
   UserRouter
})