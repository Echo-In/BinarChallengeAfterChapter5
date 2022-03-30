'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_login_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_game_login_history.belongsTo(models.user_game, {
        foreignKey: "user_id",
        targetKey: "user_id"
      });
    }
  }
  user_game_login_history.init({
    user_id: DataTypes.INTEGER,
    login_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user_game_login_history',
    tableName: 'user_game_login_history',
    freezeTableName: true,
  });
  return user_game_login_history;
};