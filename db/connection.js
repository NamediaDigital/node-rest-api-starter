const Sequelize = require('sequelize');

const database = process.env.DEV_DB_NAME;
const username = process.env.DEV_DB_USER;
const password = process.env.DEV_DB_PASS;

const db = new Sequelize(database, username, password, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
