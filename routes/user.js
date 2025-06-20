const { Router } = require("express");
const { z } = require("zod");
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const JWT = require("jsonwebtoken");
const{ JWT_USER_SECREAT } =  require("../config")

const UserRouter = Router();



const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(3).max(12),
});

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(12),
});

UserRouter.post("/signup", async (req, res) => {
  const validation = UserSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(403).json({
      error: validation.error.format(),
    });
  }
  const { firstName, lastName, email, password } = validation.data;

  try {
    const hashPassword = await bcrypt.hash(password, 5);

    const result = await userModel.create({
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
  } catch (error) {}
  return res.status(500).json({
    message: "Internal Server error",
  });
});

UserRouter.post("/signin", async (req, res) => {
  const signinValidation = SignInSchema.safeParse(req.body);

  if (!signinValidation.success) {
    return res.status(403).json({
      error: signinValidation.error.format(),
    });
  }

  try {
    const { email, password } = signinValidation.data;
    const user = await userModel.findOne({email});
    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const passwordMatch = bcrypt.compare(password,user.password);

    // verfy and attach the userId in the request

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Password incorrect",
      });
    }

    const token = JWT.sign(
      {
        userId: user._id,
      },JWT_USER_SECREAT,
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

UserRouter.get("/purchases", (req, res) => {
  res.status(200).json({
    message: "You Purchased Courses Here",
  });
});

module.exports = {
  UserRouter,
};
