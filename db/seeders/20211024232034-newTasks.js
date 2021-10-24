'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Tasks', [
     {
       name: 'Center the Div',
       content: 'The main div on 1-800-Flowers is off center',
       userId: 1,
       projectId: 1,
       dueDate: new Date(2021, 10, 26, 17),
       language: 'JavaScript',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Draw up schema',
      content: 'Since he needs a full overhaul, we need to come up with a game plan.',
      userId: 1,
      projectId: 2,
      dueDate: new Date(2021, 10, 26, 17),
      language: 'N/A',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Set up PostgreSQL',
      content: 'The old database was in excel, start from scratch.',
      userId: 1,
      projectId: 2,
      dueDate: new Date(2021, 10, 27, 17),
      language: 'SQL/PostgreSQL',
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
   return queryInterface.bulkDelete('Tasks', null, {});
  }
};
