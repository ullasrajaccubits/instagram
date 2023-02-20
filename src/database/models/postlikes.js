"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      // define association here
      PostLikes.belongsTo(model.Post, { foreignKey: "id", as: "post" });
    }
  }
  PostLikes.init(
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
    },
    {
      sequelize,
      modelName: PostLikes.name,
      tableName: "PostLikes",
      paranoid: false,
      timestamps: true,
    }
  );
  return PostLikes;
};
