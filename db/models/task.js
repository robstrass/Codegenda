'use strict';
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    dueDate: DataTypes.INTEGER,
    language: DataTypes.STRING
  }, {});
  task.associate = function(models) {
    // associations can be defined here
  };
  return task;
};