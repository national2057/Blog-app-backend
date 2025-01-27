const mongoose = require("mongoose");
const multer = require("multer");
const { Blog } = require("../models/blog.model");

exports.createBlog = async (req, res) => {
  try {
    const { title, body, coverImageURL } = req.body;
    console.log(req.body);
    if (!title || !body) {
      return res.status(404).json({
        message: "Title and Body is required.",
        success: false,
      });
    }
    const blog = Blog.create({
      title,
      body,
      coverImageURL,
    });
    return res.status(201).json({
      message: "Blog created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      return res.status(404).json({
        message: "Couldn't found blogs.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Blogs retrieved successfully.",
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Sorry, we couldn't found this blog post.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Blog retrieved successfully.",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findOneAndUpdate({ _id: blogId }, req.body, {
      new: true,
    });
    if (blog) {
      return res.status(200).json({
        message: "Blog updated successfully.",
        success: true,
        blog,
      });
    } else {
      return res.status(404).json({
        message: "Opss, Blog not Found!!",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  };
};

exports.deleteBlog = async (req, res) => {
   try {
      const blogId = req.params.id;
      const blog = await Blog.findOneAndDelete({_id: blogId});
      if(!blog){
          return res.status(404).json({
            message: "Opss, Blog not Found!!",
            success: false,
          });
      };
      return res.status(200).json({
         message: "Blog deleted successfully.",
         success: true,
         blog,
       });      
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         message: "Internal Server Error",
         success: false,
      });
   };
};
