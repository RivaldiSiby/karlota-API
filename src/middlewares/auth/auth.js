const jwt = require("jsonwebtoken");
const response = require("../../helpers/response/response");
const auth = {};

auth.verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return response.error(res, 401, "Sign in needed");
    }
    const accessToken = token.split(" ")[1];
    // verify access token
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
      issuer: process.env.JWT_ISSUER,
    });
    req.user = { id: data.id };
    next();
  } catch (error) {
    console.log(error);
    return response.error(res, 401, "Sign in needed");
  }
};

module.exports = auth;
