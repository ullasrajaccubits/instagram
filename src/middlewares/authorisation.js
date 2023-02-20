const { UnauthorizedException } = require("../helpers/errorResponse");
const { jwt } = require("../utils");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new UnauthorizedException("Token Required");
    const decoded = await jwt.verifyToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (err) {
    next(err);
  }
};
