//import mongoose 

const mongoose = require("mongoose");
const user = require("./routes/user");

// destructuring the shema to create the models

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// User Schema

const userShcema = new Schema({
    email : { type:String,unique:true },
    password : String,
    firstName : String,
    lastName : String
});


// Admin Schema

const adminSchema = new Schema({
    email : { type:String,unique:true },
    password : String,
    firstName : String,
    lastName : String
});

// Course Schema

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId
});


// purchase Schema

const purchaseSchema = new Schema({
    userId : ObjectId,
    courseId : ObjectId
})

// create the model from the mongoose

const userModel = mongoose.model("user",userShcema);
const adminModel = mongoose.model('admin',adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchase",purchaseSchema);

// export the models

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
