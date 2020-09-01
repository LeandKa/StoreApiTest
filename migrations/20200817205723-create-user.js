'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false
        },
      avatar:{
        type:Sequelize.STRING,
        allowNull:true
      },
      avatarPath:{
        type:Sequelize.STRING,
        allowNull:true
      }, 
      permissao:{
          type:Sequelize.STRING,
          allowNull:false
        },
      cartId: {
          type: Sequelize.INTEGER,
          references:{model:'Carts',key:'id'},
          onUpdate:'CASCADE',
          onDelete:'CASCADE'
        },
      password_hash: {
            type: Sequelize.STRING,
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
    return queryInterface.dropTable('Users');
  }
};