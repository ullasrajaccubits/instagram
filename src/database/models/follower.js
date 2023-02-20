"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      // define association here

      Follower.belongsTo(model.User, {
        foreignKey: "id",
        as: "user",
      });
    }
  }
  Follower.init(
    {
      followingUId: {
        type: DataTypes.BIGINT,
        references: {
          model: "Users",
          key: "id",
        },
        constrains: true,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      followedUId: {
        type: DataTypes.BIGINT,
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
      modelName: Follower.name,
      tableName: "Followers",
      paranoid: false,
      timestamps: true,
    }
  );
  return Follower;
};
