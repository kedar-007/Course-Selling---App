const { Router } = require("express");
const JWT = require("jsonwebtoken");
const { adminModel } = require("../db");
const { z } = require("zod");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Admin_JWT } = require("../config");

const { adminMiddleware } = require("../middlewares/admin");
const admin = require("../middlewares/admin");
const { courseModel } = require("../db");

const adminRouter = Router();

// all admin routes

const adminSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(3).max(12),
});

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(12),
});

adminRouter.post("/signup", async (req, res) => {
  const validation = adminSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(403).json({
      error: validation.error.format(),
    });
  }
  const { firstName, lastName, email, password } = validation.data;

  try {
    const hashPassword = await bcrypt.hash(password, 5);

    const result = await adminModel.create({
      firstName: firstName,
      lastName: lastName,
      password: hashPassword,
      email: email,
    });

    //validating the results

    if (!result) {
      return res.status(400).json({
        message: "Falied to add User",
      });
    }

    return res.status(201).json({
      message: "Signup Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const signinValidation = SignInSchema.safeParse(req.body);

  if (!signinValidation.success) {
    return res.status(403).json({
      error: signinValidation.error.format(),
    });
  }

  try {
    const { email, password } = signinValidation.data;

    const user = await adminModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const passwordMatch = bcrypt.compare(password, user.password);

    // verfy and attach the userId in the request

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Password incorrect",
      });
    }

    const token = JWT.sign(
      {
        userId: user._id,
      },
      Admin_JWT,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Signin Successfull",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  try {
    const adminId = req.adminId;
    const { title, imageUrl, description, price } = req.body;

    const result = await courseModel.create({
      title,
      description,
      imageUrl,
      price,
      creatorId: adminId,
    });

    if (!result) {
      return res.status(403).json({
        message: "Unble to add the course",
      });
    }

    return res.status(201).json({
      message: "Course Created Succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Internal server error",
    });
  }
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
    try {
      const adminId = req.adminId;
      const { title, imageUrl, description, price,courseId} = req.body;
  
      const result = await courseModel.updateOne({_id:courseId,
        creatorId:adminId
      },{
        title,
        description,
        imageUrl,
        price,
      });
  
      if (!result) {
        return res.status(403).json({
          message: "Unble to add the course",
        });
      }
  
      return res.status(201).json({
        message: "Course Updated Successdully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Internal server error",
      });
    }
  });
  
adminRouter.get("/courses/bulk", adminMiddleware,async(req, res) => {
    const adminId = req.adminId;

    //getting all the coursed
    const courses = await courseModel.find({
        creatorId:adminId
    })
  res.status(200).json({
    message: "All created Courses",
    Courses:courses
  });
});

module.exports = {
  adminRouter: adminRouter,
};
