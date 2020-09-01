'use strict';
const bycrpty = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      Name: DataTypes.STRING,
      email: DataTypes.STRING,
      permissao: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      avatar: DataTypes.STRING,
      avatarPath:DataTypes.STRING
  }, {

          hooks: {
          beforeSave: async user => {
                  if (user.password) {
                      user.password_hash = await bycrpty.hash(user.password, 8); 
                  }
          }
        }
  });
    User.associate = function (models) {
      User.belongsTo(models.Cart,{
        foreignKey:'cartId'
      })
    };

    User.prototype.checkPassword = function (password) {
        return bycrpty.compare(password, this.password_hash);
    }

    User.prototype.generateToken = function () {
        const jwtToken = jwt.sign({ id: this.id ,name:this.Name}, process.env.JWT_SECRET)
        return jwtToken;
    }


  return User;
};