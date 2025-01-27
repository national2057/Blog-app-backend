const mongoose = require("mongoose");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register..
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email!",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User registered successfully!!",
      success: false,
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      // error: error.message,
    });
  }
};

// Login..
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
        error: error.message,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not Found!!",
        success: false,
        error: error.message,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Password you inserted is incorrect.",
        success: false,
      //   error: error.message,
      });
    }
    // generate token..
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome, ${user.fullName}`,
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to register user.",
      success: false,
      error: error.message,
    });
  }
};

// Logout..
exports.logoutUser = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        message: "Account logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to register user.",
      success: false,
      error: error.message,
    });
  }
};
