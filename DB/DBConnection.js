const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");

const DBConnection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Server is Connected to MongoDB".bgYellow.bold))
    .catch((error) => console.log(error));
};
module.exports = DBConnection;