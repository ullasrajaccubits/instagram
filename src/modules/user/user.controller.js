const { expression } = require("joi");
const { responseHelper } = require("../../helpers");
const userService = require("./user.service");

exports.register = async (req, res, next) => {
  try {
    const { body } = req;
    const response = await userService.register(body);
    return responseHelper.success(res, response);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { body } = req;
    const response = await userService.login(body);
    return responseHelper.success(res, response);
  } catch (error) {
    next(error);
  }
};
exports.following = async (req, res, next) => {
  try {
    const { body } = req;
    body.followedUId = req.user.id;
    const response = await userService.following(body);
    return responseHelper.success(res, response);
  } catch (error) {
    next(error);
  }
};

exports.followList = async (req, res, next) => {
  try {
    const id = req.user.id;
    const response = await userService.followList(id);
    return responseHelper.success(res, response);
  } catch (error) {
    next(error);
  }
};

exports.unFollow = async (req, res, next) => {
  try {
    const id = req.body.Id;
    const UId = req.user.id;
    const response = await userService.unFollow({ id, UId });
    return responseHelper.success(res, response);
  } catch (error) {
    next(error);
  }
};

exports.userPost = async (req, res, next) => {
  try {
    const Id = req.user.id;
    const userId = req.params.userId;
    const response = await userService.userPost({ Id, userId });
    return responseHelper.success(res, response);
  } catch (error) {
    next(error);
  }
};
