const like = {};

const likeOrm = require("../config/orm/models/like");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const ClientError = require("../helpers/exceptions/ClientError");
const NotFoundError = require("../helpers/exceptions/NotFoundError");

like.createLike = async (body, user_id) => {
  try {
    const { like_for, like_type } = body;
    const id = "like-" + uuidv4();
    const result = await likeOrm.create(
      {
        id: id,
        like_for: like_for,
        like_type: like_type,
        like_by: user_id,
      },
      {
        where: {
          [Op.or]: [{ like_type: "post", [Op.not]: [{ like_for: user_id }] }],
        },
      }
    );
    return result;
  } catch (error) {
    if (error instanceof ClientError) {
      throw new ClientError(error.message);
    }
    throw new Error(error.message);
  }
};

like.findLikeByFor = async (like_for, like_type) => {
  try {
    const result = await likeOrm.count({
      where: {
        like_for: like_for,
        like_type: like_type,
      },
    });
    if (result === null) {
      throw new NotFoundError("Data is not found");
    }
    return result;
  } catch (error) {
    if (error instanceof ClientError) {
      throw new ClientError(error.message);
    }
    throw new Error(error.message);
  }
};
like.findLikeById = async (id) => {
  try {
    const result = await likeOrm.findOne({
      where: {
        id: id,
      },
    });
    if (result === null) {
      throw new NotFoundError("Data is not found");
    }
    return result;
  } catch (error) {
    if (error instanceof ClientError) {
      throw new ClientError(error.message);
    }
    throw new Error(error.message);
  }
};
like.deleteLike = async (id, user_id) => {
  try {
    await likeOrm.destroy({
      where: {
        id: id,
        like_by: user_id,
      },
    });
    return;
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      throw new ClientError(error.message);
    }
    throw new Error(error.message);
  }
};

module.exports = like;
