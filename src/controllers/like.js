const like = {};

const ClientError = require("../helpers/exceptions/ClientError");
const response = require("../helpers/response/response");
const likeModel = require("../models/like");

like.addLike = async (req, res) => {
  try {
    const { body, user } = req;
    await likeModel.createLike(body, user.id);
    return response.success(res, 201, "Like Has been created");
  } catch (error) {
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};
like.unLike = async (req, res) => {
  try {
    const { params, user } = req;
    await likeModel.deleteLike(params.id, user.id);
    return response.success(res, 200, "Like Has been deleted");
  } catch (error) {
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};
like.readLikeByType = async (req, res) => {
  try {
    const { query, params } = req;
    const result = await likeModel.findLikeByFor(params.id, query.like_type);
    return response.successHaveData(res, 200, "Read data has been success", {
      like: result,
    });
  } catch (error) {
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};

module.exports = like;
