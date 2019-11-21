'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'isActive', Sequelize.BOOLEAN)
   
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'isActive')
  }
};
