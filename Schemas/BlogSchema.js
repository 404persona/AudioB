const mongoose  = require("mongoose");
// const  Mongoose  = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    default: null,
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  authorName: {
    type: String,
  },
  authorEmail: {
    type: String,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);