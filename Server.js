const express = require("express");
const Server = express();
const DBConnection = require("./DB/DBConnection");
const colors = require("colors");
const dotenv = require("dotenv");
const Router = require("./Routes/Routes");
const cors = require("cors");
// const handleErrors = require('./Middleware/errorHandler')
const bodyParser = require("body-parser");
// Server.use(bodyParser.urlencoded({extended: true}))
Server.use(bodyParser.json())
dotenv.config();
Server.use('/uploads', express.static('Uploads'))
// Server.use(express.urlencoded({ extended: true }));
Server.use(cors());
Server.use(express.json());
Server.use("/api/user", Router);
DBConnection();
PORT = process.env.PORT || 4000;
Server.listen(PORT, () => {
  console.log(`Server is Started at port ${PORT}`.bgWhite.bold);
});