"use strict";
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      content: DataTypes.TEXT,
      taskId: DataTypes.INTEGER,
    },
    {}
  );
  Note.associate = function (models) {
    Note.belongsTo(models.Task, {
      foreignKey: "taskId",
    });
  };
  return Note;
};
