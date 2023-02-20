module.exports = {
  APP: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },

  USER: {
    ROLES: {
      USER: "USER",
    },
  },
  FILE: {
    allowedExtension: [".png", ".jpg", ".jpeg"],
    MB: 10,
  },
  JWT: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_LIFETIME: process.env.JWT_LIFETIME,
  },
};
