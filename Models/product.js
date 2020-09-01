'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description:DataTypes.STRING,
    favorite:DataTypes.INTEGER,
    price:DataTypes.DECIMAL(10,2),
    avatar: DataTypes.STRING,
    avatarPath:DataTypes.STRING
  }, {
    hooks: {
      beforeSave: async product => {
              if(product.avatar){
                 product.avatar = `http://localhost:3000/image/${product.avatar}`
              }
      }
    }
  });
  Product.associate = function(models) {
    Product.hasMany(models.CartItem,{
      foreignKey:'productsId'
    })
    Product.belongsTo(models.Categoria,{
      foreignKey:'categoriaId'
    })
  };
  return Product;
};