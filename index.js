
const express = require('express');
const app = express();

const UserRoutes = require('./routes/user.js');
const CourseRoutes  = require('./routes/course.js')


app.use("/api/v1/user",UserRoutes);
app.use("/api/v1/course",CourseRoutes)


app.listen(3000)
