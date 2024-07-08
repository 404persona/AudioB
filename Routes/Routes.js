const express = require("express");
const {
  RegisterUsers,
  GetUsers,
  LoginUser,
  DeleteUser,
  GetUserById,
} = require("../Controllers/UserControl");
const Router = express.Router();
const {
  RegisterProduct,
  GetProducts,
  GetProductById,
  DeleteProduct,
  AddReview,
  UpdateProduct
} = require("../Controllers/ProductControl");
const upload = require("../Middleware/UploadMiddeware");
const Blogupload = require("../Middleware/BlogMiddleware");
const {
  registerBlog,
  getBlogs,
  DeleteBlog,
  getBlogById,
} = require("../Controllers/BlogController");
// User Routes
Router.post("/signup", RegisterUsers);
Router.get("/getusers", GetUsers);
Router.post("/login", LoginUser);
Router.delete("/delete/:userId", DeleteUser);
Router.get("/getuser/:userId", GetUserById);
Router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});
// Product Routes
Router.post(
  "/addproduct",
  upload.array("image", 12),
  express.json(),
  RegisterProduct
);
Router.get("/getproducts", GetProducts);
Router.get("/product/:productId", GetProductById);
Router.delete("/deleteproduct/:productId", DeleteProduct);
Router.put('/updateproduct/:productId', UpdateProduct);
// blog Routes
Router.post("/createblog", Blogupload.single("featuredImage"), registerBlog);
Router.get("/getblogs", getBlogs);
Router.delete("/deleteblog/:blogId", DeleteBlog);
Router.get("/getblog/:blogId", getBlogById);
Router.post('/product/:productId/review', AddReview)
module.exports = Router;
