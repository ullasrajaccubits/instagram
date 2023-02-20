var db = require("../../database/models");
const { Op } = require("sequelize");
const fileStore = require("../../utils/file");
const { NotFoundException } = require("../../helpers/errorResponse");

exports.createPost = async (post) => {
  const { postTypeName } = post;
  const postType =
    (await db.Post_Type.findOne({ where: { postTypeName } })) || 1;

  post.postType = postType.id;

  post.file = await fileStore.storeFile(post.files);
  const postResponse = await db.Post.create(post);
  //check whether the tagged user is following the main user
  // console.log(postResponse);
  // post.tagId = JSON.parse(post.tagId);

  // let tagList = post.tagId.id;
  // for (var tag in tagList) {
  //   const res = await db.Follower.findOne({
  //     where: { followedUId: tagList[tag], followingUId: post.userId },
  //   });

  //   if (!res) {
  //     delete tagList[tag];
  //   }
  // }

  // tagList = tagList.filter((x) => x != null); //remove the null value from tagList

  // const tagUser = {
  //   postId: postResponse.id,
  //   tagId: tagList,
  // };
  // const tagResponse = await db.UserTag.create(tagUser);

  return {
    id: postResponse.id,
    name: postResponse.caption,
    // userTagId: tagResponse.tagId,
    file: postResponse.file,
  };
};

exports.updatePost = async (post) => {
  const data = post.body;
  const response = await db.Post.update(
    { caption: data.caption },
    { where: { id: post.postId } }
  );
  return response;
};
exports.getAllPost = async (Id) => {
  const post = await db.Post.findAll({
    where: { userId: Id },
    include: [
      {
        model: db.Post_Type,
        as: "post_type",
        attributes: ["postTypeName"],
      },
      {
        model: db.Comment,
        as: "comment",
      },
      {
        model: db.UserTag,
        as: "userTag",
      },
    ],
  });
  return post;
};

exports.deletePost = async (Id) => {
  const response = await db.Post.destroy({
    where: { id: Id },
    force: true,
  });
  if (!response) {
    throw new NotFoundException("Id is not found");
  }
  return response;
};
exports.comment = async (data) => {
  const response = await db.Comment.create(data);
  const count = await db.Post.increment(
    {
      totalLikes: +1,
      totalComment: +1,
    },
    { where: { id: data.postId } }
  );
  return {
    id: response.id,
    user_id: response.userID,
    count,
  };
};
exports.like = async (data) => {
  const count = await db.PostLikes.findOne({
    where: { postId: data.postId, userId: data.userId },
  });
  if (!count) {
    const response = await db.PostLikes.create(data);
    await db.Post.increment(
      {
        totalLikes: +1,
      },
      { where: { id: data.postId } }
    );
    return {
      id: response.id,
      user_id: response.userID,
    };
  } else {
    const response = await db.PostLikes.destroy({
      where: { postId: data.postId, userId: data.userId },
    });
    await db.Post.decrement(`totalLikes`, {
      by: 1,
      where: { id: data.postId, totalLikes: { [Op.gte]: 1 } },
    });
    return {
      id: response.id,
      user_id: response.userID,
    };
  }
};
exports.tagPost = async (data) => {
  const response = await db.UserTag.findAll({
    where: {
      tagId: {
        [Op.regexp]: data,
      },
    },
    include: [
      {
        model: db.Post,
        as: "post",
      },
    ],
  });

  return response;
};
