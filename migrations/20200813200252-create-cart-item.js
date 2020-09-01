'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productsId:{
        type: Sequelize.INTEGER,
        references:{model:'Products',key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      cartItemId:{
        type:Sequelize.INTEGER,
        references:{model:'Carts',key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      price:{
        type:Sequelize.DECIMAL(10,2),
        allowNull:false
      },
      total:{
        type:Sequelize.DECIMAL(10,2),
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CartItems');
  }
};