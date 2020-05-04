"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require(__root + "db/connection");

const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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

const UserModel = User(sequelize, DataTypes);

exports.findByEmail = (email) => {
  return UserModel.findOne({ where: { email: email } });
};

exports.findById = (id) => {
  return UserModel.findOne({ where: { id: id } }).then((result) => {
    result = result.toJSON();
    return result;
  });
};

exports.createUser = (userData) => {
  return UserModel.findOrCreate(userData);
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    UserModel.findAll({ limit: perPage, offset: perPage * page })
      .then((users) => resolve(users))
      .catch((err) => reject(err));
  });
};

exports.patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ where: { id: id } })
      .then((user) =>
        user
          .update(userData)
          .then((user) => {
            resolve(user);
          })
          .catch((err) => {
            reject(err);
          })
      )
      .catch((err) => reject(err));
  });
};

exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ where: { id: userId } })
      .then((user) => {
        user.destroy({ force: true });
        resolve("User was removed!");
      })
      .catch((err) => {
        reject(err);
      });
  });
};
