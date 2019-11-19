'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'salt', Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColum('Users', 'salt')

  }
};
