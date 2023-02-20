const express = require("express");
const { validationMiddleware, authMiddleware } = require("../../middlewares");
const { userSchema } = require("./user.validation");
const userController = require("./user.controller");

const router = express.Router();

router.post(
  "/",
  validationMiddleware(userSchema.register),
  userController.register
);
router.post(
  "/login",
  validationMiddleware(userSchema.login),
  userController.login
);
router.get("/following", authMiddleware, userController.followList);
router.post(
  "/following",
  authMiddleware,
  validationMiddleware(userSchema.following),
  userController.following
);
router.delete("/following", authMiddleware, userController.unFollow);

router.get("/:userId/post", authMiddleware, userController.userPost);
module.exports = router;
