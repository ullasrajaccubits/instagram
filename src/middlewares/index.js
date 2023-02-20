const validation = require("./validation");
const authorization = require("./authorisation");

module.exports = {
  validationMiddleware: validation,
  authMiddleware: authorization,
};
