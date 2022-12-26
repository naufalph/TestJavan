"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.hasMany(models.Nucleus, {as: 'Parents', foreignKey: "parentId" });
      Member.hasMany(models.Nucleus, { as: "Children", foreignKey: "childId" });
      Member.hasMany(models.Asset, { foreignKey: "memberId" });
    }
    
  }
  Member.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "name cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "name cannot be empty",
          },
        },
      },
      totalAsset: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Member",
      hooks: {
        beforeCreate: (member) => {
          member.totalAsset = 0;
        },
      },
    }
  );
  return Member;
};
