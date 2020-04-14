'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connection');

const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};

module.exports = User(sequelize, DataTypes);
