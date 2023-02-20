"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      // define association here

      Comment.belongsTo(model.User, { foreignKey: "id", as: "user" });
      Comment.belongsTo(model.Post, { foreignKey: "id", as: "post" });
    }
  }
  Comment.init(
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
      postId: {
        type: DataTypes.BIGINT,
        references: {
          model: "Posts",
          key: "id",
        },
        constrains: true,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      comment: DataTypes.STRING,
      cmtRply: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: Comment.name,
      tableName: "Comments",
      paranoid: false,
      timestamps: true,
    }
  );
  return Comment;
};
