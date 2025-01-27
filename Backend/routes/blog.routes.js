const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");
const { singleUpload } = require("../middleware/multer");
const { isAuthenticated } = require("../middleware/isAuthenticated");

// router
//   .post("/create", singleUpload, isAuthenticated, blogController.createBlog)
//   .get("/", isAuthenticated, blogController.getAllBlogs)
//   .get("/blog/:id", isAuthenticated, blogController.getSingleBlog)
//   .patch("/blog/:id", singleUpload, isAuthenticated, blogController.updateBlog)
//   .delete("/blog/:id", isAuthenticated, blogController.deleteBlog);

router
  .post("/create", singleUpload, blogController.createBlog)
  .get("/", blogController.getAllBlogs)
  .get("/blog/:id", blogController.getSingleBlog)
  .patch("/blog/:id", singleUpload, blogController.updateBlog)
  .delete("/blog/:id", blogController.deleteBlog);

exports.router = router;