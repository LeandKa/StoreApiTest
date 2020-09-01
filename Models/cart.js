'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    nomeCart: DataTypes.STRING
  }, {});
  Cart.associate = function(models) {
    Cart.hasOne(models.User,{
      foreignKey:'cartId'
    })
    Cart.hasMany(models.CartItem,{
      foreignKey:'cartItemId'
    })
  };
  return Cart;
};