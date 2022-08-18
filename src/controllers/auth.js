const usersModel = require("../models/users");
const authModel = require("../models/auth");
const ClientError = require("../helpers/exceptions/ClientError");
const response = require("../helpers/response/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { client } = require("../config/cache/redis");
const auth = {};

auth.register = async (req, res) => {
  try {
    const result = await authModel.register(req.body);
    return response.successHaveData(res, 201, "Register has been success", {
      id: result.id,
    });
  } catch (error) {
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};
auth.login = async (req, res) => {
  try {
    const { email, password, device, notification_token = null } = req.body;
    // check email and pass
    const user = await authModel.findUserByEmail(email);
    const checkpass = await bcrypt.compare(password, user.password);
    if (!checkpass) {
      throw new ClientError("Email is not registered Or Password is Wrong");
    }
    // user data
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      description: user.description,
      img: user.img,
      role: user.role,
    };
    // generate jwt
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    // access token
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      issuer: process.env.JWT_ISSUER,
      expiresIn: "1200s",
    });
    // refresh token
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      issuer: process.env.JWT_ISSUER,
      expiresIn: "1d",
    });
    // data auth
    const auth = {
      refresh_token: refreshToken,
      notification_token: notification_token,
      device: device,
      user_id: user.id,
    };
    await authModel.postAuth(auth);
    // // send data to redis
    // await client.set(`jwt${user.id}`, refreshToken, "EX", 60 * 60 * 24);
    // response
    const loginPayload = {
      user: data,
      token: accessToken,
    };
    return response.successHaveData(
      res,
      200,
      "You have successfully to Login",
      loginPayload
    );
  } catch (error) {
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};
auth.refreshToken = async (req, res) => {
  try {
    const result = await authModel.getAuth(req.params.id);
    const user = jwt.verify(
      result.refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      {
        issuer: process.env.JWT_ISSUER,
      }
    );
    // generate access token
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      issuer: process.env.JWT_ISSUER,
      expiresIn: "1200s",
    });
    return response.successHaveData(
      res,
      201,
      "new access token has been generated",
      { token: accessToken }
    );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      await authModel.deleteAuth(req.params.id);
      return response.error(res, 401, "You need to Sign in again");
    }
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};
auth.logout = async (req, res) => {
  try {
    await authModel.deleteAuth(req.user.id);
    return response.success(res, 200, "You have successfully to Logout");
  } catch (error) {
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};

module.exports = auth;
