"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      dueDate: DataTypes.DATE,
    },
    {}
  );
  Project.associate = function (models) {
    Project.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Project.hasMany(models.Task, {
      foreignKey: "projectId",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return Project;
};
