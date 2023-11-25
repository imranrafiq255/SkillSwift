const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Users routes
const users = require("./routes/Users/users.routes.js");
app.use("/api/v1/users/", users);
module.exports = app;
