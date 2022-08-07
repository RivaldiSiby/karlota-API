// orm modellist
const UsersOrm = require("../config/orm/models/users");

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

module.exports = users;
