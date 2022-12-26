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
    }
  }
  Nucleus.init({
    parentId: DataTypes.INTEGER,
    childId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Nucleus',
  });
  return Nucleus;
};