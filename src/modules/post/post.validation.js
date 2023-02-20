const Joi = require("joi");

const postSchema = {
  createPost: {
    body: Joi.object().keys({
      caption: Joi.string().trim().min(3).max(50).trim(),
      postTypeName: Joi.string().trim().min(1).max(50).trim(),
      tagUserId: Joi.number().integer().min(5).max(50),
      filterName: Joi.string().trim().min(3).max(50).trim(),
      effectName: Joi.string().trim().min(3).max(50).trim(),
      latitude: Joi.string().trim().min(3).max(50).trim(),
      longitude: Joi.string().trim().min(3).max(50).trim(),
      position: Joi.number().integer().min(3).max(50),
      mediaFile: Joi.string().trim().min(3).max(50).trim(),
    }),
  },
  comments: {
    body: Joi.object().keys({
      comment: Joi.string().trim().min(3).max(50).trim(),
      cmtRply: Joi.string().trim().min(3).max(50).trim(),
      userId: Joi.number().integer(),
    }),
  },
};

module.exports = { postSchema };
