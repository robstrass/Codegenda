'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Projects', [
     {
       name: 'Build Website',
       content: '1-800-Flowers needs a new web design that does not look ancient',
       userId: 1,
       dueDate: new Date(2021, 10, 29, 17),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Update Backend for Peterson',
      content: 'Peterson\'s backend needs a complete overhaul.',
      userId: 1,
      dueDate: new Date(2021, 10, 28, 17),
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Projects', null, {});
  }
};
