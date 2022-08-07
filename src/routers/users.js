const express = require("express");
const users = require("../models/users");
const auth = require("../middlewares/auth/auth");
const Router = express.Router();

// endpoint list
Router.get("/", auth.verifyToken, (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Read all users has been successed",
    data: users.getAll().then((data) => data),
  });
});

module.exports = Router;
