'use strict';
const bcrypt = require("bcrypt");
const { password } = require("pg/lib/defaults");
const jwt = require("jsonwebtoken");
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

    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    static register = ({username,password, usertype}) => {
      const encrytedPassword = this.#encrypt(password);
      return this.create({username, password: encrytedPassword, usertype});
    } ;

    checkPassword = password => bcrypt.compareSync(password, this.password);

    static authenticate = async ({ username, password}) => {
      console.log()
      try{
        const user = await this.findOne({where: {username}})
        if(!user) return Promise.reject("User not found!")
        const isPasswordValid = user.checkPassword(password)
        if(!isPasswordValid) return Promise.reject("Wrong Password")
        return Promise.resolve(user)
      }
      catch(err){
        return Promise.reject(err);
      }
    }
    
    generateToken = () => {
      const payload = {
        user_id: this.user_id,
        username: this.username,
      }
      const signkey = "gHyuo98";
      const token = jwt.sign(payload,signkey)
      return token
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