"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      // define association here
      Post_Type.hasMany(model.Post, { foreignKey: "postType", as: "post" });
    }
  }
  Post_Type.init(
    {
      postTypeName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: Post_Type.name,
      tableName: "Post_Types",
      paranoid: false,
      timestamps: true,
    }
  );
  return Post_Type;
};
