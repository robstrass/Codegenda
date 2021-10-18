"use strict";
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      taskId: DataTypes.INTEGER,
    },
    {}
  );
  Note.associate = function (models) {
    Note.belongsTo();
  };
  return Note;
};
