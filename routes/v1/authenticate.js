const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../db/models/user");

router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  User.findOne({ where: { email: email } })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

module.exports = router;
