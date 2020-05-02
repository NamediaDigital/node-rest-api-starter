const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (userId) {
  return jwt.sign({ userId }, jwtSecret, {
    // expires in one week = 7 * 24 * 60 * 60
    expiresIn: 604800,
  });
};
