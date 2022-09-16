const post = {};

const ClientError = require("../helpers/exceptions/ClientError");
const response = require("../helpers/response/response");
const postModel = require("../models/post");

post.createPost = async (req, res) => {
  try {
    const { body, user } = req;
    await postModel.createPost(user.id, body);
    return response.success(res, 201, "Post Has been created");
  } catch (error) {
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};

post.updatePost = async (req, res) => {
  try {
    const { body, user, params } = req;
    await postModel.updatePost(params, user.id, body);
    return response.success(res, 200, "Post Has been updated");
  } catch (error) {
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};

post.deletePost = async (req, res) => {
  try {
    await postModel.deletePost(req.params.id);
    return response.success(res, 200, "Post Has been updated");
  } catch (error) {
    if (error instanceof ClientError) {
      return response.error(res, error.statusCode, error.message);
    }
    return response.error(res, 500, "Sorry, there was a failure on our server");
  }
};

module.exports = post;
