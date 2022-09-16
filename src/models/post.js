const postOrm = require("../config/orm/models/post");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const ClientError = require("../helpers/exceptions/ClientError");

const post = {};

post.createPost = async (sender, body) => {
  try {
    const { postText } = body;
    const id = `post-${uuidv4()}`;
    const result = await postOrm.create({
      id: id,
      text: postText,
      sender: sender,
    });
    return result;
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      throw new ClientError(error.message);
    }
    throw new Error(error.message);
  }
};

post.updatePost = async (id, sender, body) => {
  try {
    const { postText } = body;
    const result = await postOrm.update(
      { text: postText },
      { where: { [Op.and]: [{ id: id }, { sender: sender }] } }
    );
    return result;
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      throw new ClientError(error.message);
    }
    throw new Error(error.message);
  }
};

post.deletePost = async (id) => {
  try {
    const result = await postOrm.destroy({
      where: { id: id },
    });
    return result;
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      throw new ClientError(error.message);
    }
    throw new Error(error.message);
  }
};

module.exports = post;
