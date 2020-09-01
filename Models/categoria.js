'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    name: DataTypes.STRING
  }, {});
  Categoria.associate = function(models) {
    Categoria.hasOne(models.Product,{
      foreignKey:'categoriaId'
    })
  };
  return Categoria;
};