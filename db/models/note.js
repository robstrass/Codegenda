'use strict';
module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define('note', {
    id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    taskId: DataTypes.INTEGER
  }, {});
  note.associate = function(models) {
    // associations can be defined here
  };
  return note;
};