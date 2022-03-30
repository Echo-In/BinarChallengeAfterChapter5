'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_game_biodata.belongsTo(models.user_game, {
        foreignKey: "user_id",
        targetKey: "user_id"
      });
    }
  }
  user_game_biodata.init({
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    firstname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    lastname: DataTypes.STRING,
    dob: DataTypes.DATE,
    birthplace: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_game_biodata',
    tableName: 'user_game_biodata',
    freezeTableName: true,
  });
  return user_game_biodata;
};