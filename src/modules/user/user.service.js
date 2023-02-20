const { MESSAGES, CONSTANTS } = require("../../config");
const db = require("../../database/models");
const { BadRequestException } = require("../../helpers/errorResponse");
const { bcrypt, jwt } = require("../../utils");
const Op = require("Sequelize").Op;

exports.register = async (user) => {
  user.password = await bcrypt.generatePassword(user.password);
  const response = await db.User.create(user);
  return {
    id: response.id,
    name: response.name,
    email: response.email,
    profileName: response.profileName,
    createdAt: response.createdAt,
  };
};

exports.login = async (params) => {
  const { email, password } = params;

  const user = await db.User.findOne({ where: { email } });
  if (!user) throw new BadRequestException(MESSAGES.USER.LOGIN.INVALID_CREDS);

  const passwordMatch = await bcrypt.verifyPassword(password, user.password);
  if (!passwordMatch)
    throw new BadRequestException(MESSAGES.USER.LOGIN.INVALID_CREDS);

  const accessToken = jwt.generateAccessToken({
    id: user.id,
    email: user.email,
  });

  return {
    success: true,
    id: user.id,
    name: user.name,
    email: user.email,
    accessToken,
  };
};

exports.following = async (followId) => {
  const response = await db.Follower.create(followId);
  return {
    id: response.id,
    followingId: response.followingUId,
    followdId: response.followedUId,
  };
};

exports.followList = async (id) => {
  const follower = await db.Follower.findAll({
    where: { followedUId: id },
    attributes: ["followingUId"],
  });
  const following = await db.Follower.findAll({
    where: { followingUId: id },
    attributes: ["followedUId"],
  });

  return {
    followerId: follower,
    followerCount: follower.length,
    followingId: following,
    followingCount: following.length,
  };
};

exports.unFollow = async (user) => {
  const response = await db.Follower.destroy({
    where: { followingUId: user.id, followedUId: user.UId },
  });
  return response;
};

exports.userPost = async (user) => {
  const friend = await db.Follower.findOne({
    where: {
      [Op.or]: [
        { followingUId: user.Id, followedUId: user.userId },
        { followingUId: user.userId, followedUId: user.Id },
      ],
    },
  });
  if (!friend) {
    throw new BadRequestException(MESSAGES.USER.Friend.NO_PERMISSION);
  }
  const post = await db.Post.findAll({ where: { userId: user.userId } });
  return post;
};
