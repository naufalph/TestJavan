"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asset.belongsTo(models.Product, { foreignKey: "productId" });
      Asset.belongsTo(models.Member, { foreignKey: "memberId" });
    }
  }
  Asset.init(
    {
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "memberId cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "memberId cannot be empty",
          },
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "productId cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "productId cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Asset",
    }
  );
  return Asset;
};
