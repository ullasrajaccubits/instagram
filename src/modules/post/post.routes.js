const express = require("express");
const { validationMiddleware, authMiddleware } = require("../../middlewares");
const { postSchema } = require("./post.validation");
const postController = require("./post.controller");

const { file } = require("../../utils");

const router = express.Router();

router.get("/", authMiddleware, postController.getAllPost);
router.post(
  "/createPost",
  authMiddleware,
  validationMiddleware(postSchema.createPost),

  file.fileValidity,
  postController.createPost
);
router.post(
  "/:postId/comments",
  authMiddleware,
  validationMiddleware(postSchema.comments),
  postController.comment
);
router.post("/:postId/like", authMiddleware, postController.like);
router.patch(
  "/:postId",
  authMiddleware,
  validationMiddleware(postSchema.createPost),
  postController.updatePost
);

router.delete("/:postId", authMiddleware, postController.deletePost);

router.get("/tagPost", authMiddleware, postController.tagPost);
module.exports = router;
