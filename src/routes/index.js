const express = require("express");
const { userRoutes } = require("../modules/user");
const { postRoutes } = require("../modules/post");
const router = express.Router();

router.use("/user", userRoutes);
router.use("/post", postRoutes);
module.exports = router;
