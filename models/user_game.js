'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      user_game.hasOne(models.user_game_biodata, {
        foreignKey: 'user_id',
        sourceKey: "user_id",
      });

      user_game.belongsTo(models.user_game_biodata, {
        foreignKey: "user_id",
        targetKey: "user_id"
      });

      user_game.hasMany(models.user_game_history, {
        foreignKey: "user_id",
        sourceKey: "user_id"
      });

      user_game.belongsTo(models.user_game_history, {
        foreignKey: "user_id",
        targetKey: "user_id",
      });

      user_game.hasMany(models.user_game_login_history, {
        foreignKey: "user_id",
        sourceKey: "user_id"
      });

      user_game.belongsTo(models.user_game_login_history, {
        foreignKey: "user_id",
        targetKey: "user_id"
      });

    }
  }
  user_game.init({
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    usertype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_game',
    table_name: 'user_game',
    freezeTableName: true,
    // underscored: true,
  });
  //user_game.removeAttribute("id");
  return user_game;
};