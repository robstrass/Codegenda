"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      dueDate: DataTypes.INTEGER,
      language: DataTypes.STRING,
    },
    {}
  );
  Task.associate = function (models) {
    // associations can be defined here
  };
  return Task;
};
