"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      // define association here
      User.hasMany(model.Post, { foreignKey: "userId", as: "post" });
      User.hasMany(model.Follower, {
        foreignKey: "followedUId",
        as: "follower",
      });

      User.hasMany(model.Comment, { foreignKey: "userId", as: "comment" });
      User.hasMany(model.UserTag, { foreignKey: "tagId", as: "userTag" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      profileName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: User.name,
      tableName: "Users",
      paranoid: false,
      timestamps: true,
    }
  );
  return User;
};
