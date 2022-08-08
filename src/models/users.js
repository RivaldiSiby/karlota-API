// orm modellist
const UsersOrm = require("../config/orm/models/users");
const bcrypt = require("bcrypt");
const deleteFile = require("../helpers/files/delete");

const users = {};

users.getAll = async () => {
  try {
    const result = await UsersOrm.findAll();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
users.getUserById = async (id) => {
  try {
    const result = await UsersOrm.findOne({ where: { id: id } });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

users.updateUser = async (body, img = null, id) => {
  try {
    const {
      name = null,
      email = null,
      gender = null,
      description = null,
    } = body;

    if (img !== null) {
      const getImg = await UsersOrm.findOne({
        attributes: ["img"],
        where: { id: id },
      });
      if (getImg.img !== null) await deleteFile(getImg.img);
    }
    // check data , if have data . Add data to object data
    const data = {};
    name !== null ? (data.name = name) : "";
    email !== null ? (data.email = email) : "";

    gender !== null ? (data.gender = gender) : "";
    description !== null ? (data.description = description) : "";
    img !== null ? (data.img = img.path) : "";
    const result = await UsersOrm.update(data, { where: { id: id } });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
users.updatePassword = async (password, id) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await UsersOrm.update(
      { password: hashPassword },
      { where: { id: id } }
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = users;
