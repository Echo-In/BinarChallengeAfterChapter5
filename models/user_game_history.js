'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // user_game_history.hasMany(models.user_game, {
      //   foreignKey: "user_id",
      //   targetKey: "user_id",
      // });
      user_game_history.belongsTo(models.user_game, {
        foreignKey: "user_id",
        targetKey: "user_id",
      });
      // user_game.belongsTo(models.user_game_history, {
      //   foreignKey: "user_id",
      //   targetKey: "user_id"
      // });
    }
  }
  user_game_history.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: 'user_game', key: 'user_id' },
    },
    score_result: DataTypes.INTEGER,
    played_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user_game_history',
    tableName: 'user_game_history',
    freezeTableName: true,
  });
  return user_game_history;
};