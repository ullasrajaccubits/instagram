"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      // define association here
      Post.belongsTo(model.User, { foreignKey: "id", as: "user" });
      Post.belongsTo(model.Post_Type, {
        foreignKey: "id",
        as: "post_type",
      });
      Post.hasMany(model.Comment, { foreignKey: "postId", as: "comment" });
      Post.hasMany(model.UserTag, { foreignKey: "postId", as: "userTag" });
      Post.hasMany(model.PostLikes, { foreignKey: "postId", as: "postLikes" });
    }
  }
  Post.init(
    {
      userId: {
        type: DataTypes.BIGINT,
        references: {
          model: "Users",
          key: "id",
        },
        constrains: true,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      caption: DataTypes.STRING,
      postType: {
        type: DataTypes.BIGINT,
        references: {
          model: "Post_Types",
          key: "id",
        },
        constrains: true,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      file: {
        type: DataTypes.STRING,
      },
      totalLikes: {
        type: DataTypes.BIGINT,
      },
      totalComment: {
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      modelName: Post.name,
      tableName: "Posts",
      paranoid: false,
      timestamps: true,
    }
  );
  return Post;
};
