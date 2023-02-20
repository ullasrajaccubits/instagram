"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      // define association here
      UserTag.belongsTo(model.Post, { foreignKey: "id", as: "post" });
      UserTag.belongsTo(model.User, { foreignKey: "id", as: "user" });
    }
  }
  UserTag.init(
    {
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
      tagId: {
        type: DataTypes.JSON,
        references: {
          model: "Users",
          key: "id",
        },
        constrains: true,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: UserTag.name,
      tableName: "UserTags",
      paranoid: false,
      timestamps: true,
    }
  );
  return UserTag;
};
