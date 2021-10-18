"use strict";

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
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
    Task.hasMany(models.Note, {
      foreignKey: "taskId",
    });
    Task.belongsTo(models.Project, {
      foreignKey: "projectId",
    });
    Task.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Task;
};
