const express = require("express");
const authControllers = require("../controllers/auth");
const authValidator = require("../middlewares/validator/auth/index");
const auth = require("../middlewares/auth/auth");
const Router = express.Router();

// endpoit List
Router.post("/register", authValidator.regis, authControllers.register);
Router.post("/login", authValidator.login, authControllers.login);
Router.get("/refreshToken/:id", authControllers.refreshToken);
Router.delete("/logout", auth.verifyToken, authControllers.logout);

module.exports = Router;
