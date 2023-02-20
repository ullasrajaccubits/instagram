const { responseHelper } = require("../../helpers");
const { BadRequestException } = require("../../helpers/errorResponse");
const postService = require("./post.service");

exports.createPost = async (req, res, next) => {
  try {
    const { body } = req;
    body.files = req.files.file;
    body.ui = req.ui;
    body.userId = req.user.id;
    const response = await postService.createPost(body);
    return responseHelper.success(res, response);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { body } = req;
    const postId = req.params.postId;
    body.userId = req.user.id;

    const response = await postService.updatePost({ postId, body });
    return responseHelper.success(res, response);
  } catch (error) {
    next(error);
  }
};
exports.getAllPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const response = await postService.getAllPost(userId);
    return responseHelper.success(res, response);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const id = req.params.postId;
    if (isNaN(id)) {
      throw new BadRequestException("invalid id");
    }
    const response = await postService.deletePost(id);
    return responseHelper.success(res, response);
  } catch (error) {
    next(error);
  }
};
exports.comment = async (req, res, next) => {
  try {
    const { body } = req;
    body.postId = req.params.postId;
    body.userId = req.user.id;
    const response = await postService.comment(body);
    return responseHelper.success(res, response);
  } catch (err) {
    next(err);
  }
};
exports.like = async (req, res, next) => {
  try {
    const { body } = req;
    body.postId = req.params.postId;
    body.userId = req.user.id;
    const response = await postService.like(body);
    return responseHelper.success(res, response);
  } catch (err) {
    next(err);
  }
};

exports.tagPost = async (req, res, next) => {
  try {
    const id = req.user.id;
    const response = await postService.tagPost(id);
    return responseHelper.success(res, response);
  } catch (err) {
    next(err);
  }
};
