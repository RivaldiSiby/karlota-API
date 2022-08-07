// orm modellist
const UsersOrm = require("../config/orm/models/users");
const AuthOrm = require("../config/orm/models/auth");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const ClientError = require("../helpers/exceptions/ClientError");
const auth = {};

auth.register = async (body) => {
  try {
    const id = `user-${uuidv4()}`;
    const { name, email, password, gender } = body;
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await UsersOrm.create({
      id: id,
      name: name,
      email: email,
      password: hashPassword,
      gender: gender,
    });
    return result;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    if (error.message.validationError !== undefined) {
      throw new ClientError(error.message.validationError);
    }
    throw new Error("Sorry, there was a failure on our server");
  }
};

module.exports = auth;
