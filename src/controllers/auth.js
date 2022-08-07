const usersModel = require("../models/users");
const authModel = require("../models/auth");
const ClientError = require("../helpers/exceptions/ClientError");
const response = require("../helpers/response/response");
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
    return response.error(res, 500, error.message);
  }
};

module.exports = auth;
