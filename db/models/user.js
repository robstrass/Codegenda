"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      hashedPassword: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Project, {
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
    });
    User.hasMany(models.Task, {
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return User;
};
