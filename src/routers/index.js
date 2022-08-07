const express = require("express");
const Router = express.Router();

// Route list
const userRoute = require("./users");
const authRoute = require("./auth");
// Endpoint API List
Router.use("/users", userRoute);
Router.use("/auth", authRoute);
// Welcome end Point
Router.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Welcome to Karlota App API",
  });
});
// notfound API
Router.get("*", (req, res) => {
  res.status(404).send({
    status: "error",
    message: "Endpoint API is not found",
  });
});

module.exports = Router;
