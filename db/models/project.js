'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    dueDate: DataTypes.INTEGER
  }, {});
  Project.associate = function(models) {
    
  };
  return Project;
};