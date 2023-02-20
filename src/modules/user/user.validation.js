const Joi = require("joi");

const userSchema = {
  register: {
    body: Joi.object().keys({
      name: Joi.string().trim().min(3).max(50).trim().required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(3).max(50).trim().required(),
      profileName: Joi.string().trim().min(3).max(50).trim().required(),
    }),
  },
  login: {
    body: Joi.object().keys({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(3).max(50).trim().required(),
    }),
  },
  following: {
    body: Joi.object().keys({
      followingUId: Joi.number().integer().min(1).max(50).required(),
    }),
  },
};

module.exports = { userSchema };
