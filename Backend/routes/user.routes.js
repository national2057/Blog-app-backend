const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router
  .post("/register", userController.registerUser)
  .post("/login", userController.loginUser)
  .get("/logout", userController.logoutUser);

exports.router = router;
