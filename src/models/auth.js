// orm modellist
const UsersOrm = require("../config/orm/models/users");
const AuthOrm = require("../config/orm/models/auth");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const ClientError = require("../helpers/exceptions/ClientError");
const NotFoundError = require("../helpers/exceptions/NotFoundError");
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
      role: "user",
    });
    return result;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    if (error.message.validationError !== undefined) {
      throw new ClientError(error.message.validationError);
    }
    throw new Error(error.message);
  }
};
auth.postAuth = async (body) => {
  try {
    const id = `user-${uuidv4()}`;
    const { refresh_token, notification_token, device, user_id } = body;
    const result = await AuthOrm.create({
      id: id,
      refresh_token: refresh_token,
      notification_token: notification_token,
      device: device,
      user_id: user_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    if (error.message.validationError !== undefined) {
      throw new ClientError(error.message.validationError);
    }
    throw new Error(error.message);
  }
};
auth.deleteAuth = async (id) => {
  try {
    await AuthOrm.destroy({
      where: { user_id: id },
    });
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};
auth.getAuth = async (id) => {
  try {
    const result = await AuthOrm.findOne({
      where: { user_id: id },
    });
    if (result === null) {
      throw new NotFoundError("User not Sign in");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
auth.findUserByEmail = async (email) => {
  try {
    const result = await UsersOrm.findOne({
      where: {
        email: email,
      },
    });
    if (result === null) {
      throw new NotFoundError("Email or Password is wrong");
    }
    return result;
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      throw new ClientError(error.message);
    }
    throw new Error(error.message);
  }
};

module.exports = auth;
