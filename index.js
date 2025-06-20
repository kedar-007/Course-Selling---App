
const express = require('express');
const mongoose = require("mongoose");


const { UserRouter } = require('./routes/user.js');
const { CourseRouter} = require('./routes/course.js');
const { adminRouter } = require('./routes/admin.js');

const app = express();
//Parse the Json bodies
app.use(express.json())

app.use("/api/v1/user",UserRouter);
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/course",CourseRouter)

async function main () {

    try {
        const connection = await mongoose.connect("mongodb+srv://kedar:Kedar%407390@gofood.d85dvg9.mongodb.net/Course-Selling")
        console.log("connected to the database")
    } catch (error) {
        console.log("failed to connect the database")
    }
    
    app.listen(3000,()=>{
        console.log("Server is running on the PORT 3000")
    })
}
// calling the main function
main()