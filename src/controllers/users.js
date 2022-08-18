const ClientError = require("../helpers/exceptions/ClientError");
const NotFoundError = require("../helpers/exceptions/NotFoundError");
const response = require("../helpers/response/response");
const bcrypt = require("bcrypt");
const usersModel = require("../models/users");
const users = {};

users.updateProfile = async (req, res) => {
  try {
    console.log(req.body);
    const { user, body, file = null } = req;
    const result = await usersModel.updateUser(body, file, user.id);
    if (result === 0) {
      throw new NotFoundError("User is not found");
    }
    return response.success(res, 200, "Profile has been updated");
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};

users.updatePassword = async (req, res) => {
  try {
    const { user, body } = req;
    // cek password
    const pass = await usersModel.getUserById(user.id);
    const checkpass = await bcrypt.compare(body.oldPassword, pass.password);
    if (!checkpass) {
      throw new ClientError("Old Password is wrong");
    }
    const result = await usersModel.updatePassword(body.newPassword, user.id);
    if (result === 0) {
      throw new NotFoundError("User is not found");
    }
    return response.success(res, 200, "Password has been updated");
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};

module.exports = users;
