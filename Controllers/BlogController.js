const BlogSchema = require("../Schemas/BlogSchema");
const path = require("path");
const mongoose = require("mongoose");
const registerBlog = async (req, res) => {
  try {
    const { title, content, authorName, authorEmail } = req.body;
    const featuredImage = req.file ? req.file.filename : null;
    const newBlog = new BlogSchema({
      title,
      content,
      authorName,
      authorEmail,
      featuredImage: featuredImage,
    });
    await newBlog.save();
    console.log(req.file);
    res.send(newBlog);
  } catch (error) {
    console.log(error);
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogSchema.find();
    res.send(blogs);
  } catch (error) {
    console.log(error);
  }
};

const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).send({ message: "Invalid blog ID" });
    }

    const blog = await BlogSchema.findById(blogId);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    res.send(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const DeleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const deletedBlog = await BlogSchema.findByIdAndDelete(blogId);
    res.send(deletedBlog);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerBlog, getBlogs, DeleteBlog, getBlogById };
