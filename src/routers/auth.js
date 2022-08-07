const express = require("express");
const authControllers = require("../controllers/auth");
const authValidator = require("../middlewares/validator/auth/index");
const Router = express.Router();

// endpoit List
Router.post("/register", authValidator.regis, authControllers.register);

module.exports = Router;
