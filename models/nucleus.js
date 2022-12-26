'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nucleus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nucleus.belongsTo(models.Member, { foreignKey: "parentId" });
      Nucleus.belongsTo(models.Member, { foreignKey: "childId" });
    }
  }
  Nucleus.init(
    {
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "ParentId cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "ParentId cannot be empty",
          },
        },
      },
      childId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "childId cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "childId cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Nucleus",
    }
  );
  return Nucleus;
};