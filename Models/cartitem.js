'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2),
    total:DataTypes.DECIMAL(10,2)
  }, {});
  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Product,{
      foreignKey:'productsId'
    })
    CartItem.belongsTo(models.Cart,{
      foreignKey:'cartItemId'
    })
  };
  return CartItem;
};