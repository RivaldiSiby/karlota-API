const express = require("express");
const users = require("../models/users");
const auth = require("../middlewares/auth/auth");
const imgUpload = require("../middlewares/files/upload");
const usersControllers = require("../controllers/users");
const userValidator = require("../middlewares/validator/users");
const Router = express.Router();

// endpoint list
Router.patch(
  "/profile",
  auth.verifyToken,
  imgUpload.single("img"),
  userValidator.profile,
  usersControllers.updateProfile
);
Router.patch(
  "/password",
  auth.verifyToken,
  userValidator.password,
  usersControllers.updatePassword
);

Router.get("/", auth.verifyToken, (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Read all users has been successed",
    data: users.getAll().then((data) => data),
  });
});

module.exports = Router;
