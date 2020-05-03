const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const jwtExp = process.env.JWT_EXP;

module.exports = function (userId) {
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: jwtExp,
  });
};
