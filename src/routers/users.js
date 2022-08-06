const express = require("express");
const users = require("../models/users");
const Router = express.Router();

// endpoint list
Router.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Read all users has been successed",
    data: users.getAll().then((data) => data),
  });
});

module.exports = Router;
