const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const createJwt = require("./createJwt");
const User = require(__root + "db/models/user");

router.post("/login", function (req, res, next) {
  const { email, password } = req.body;

  // Find User with the email provided in the database
  User.findOne({ where: { email } })
    .then(async (user) => {
      if (user) {
        // check if the password is valid
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          // Creare JWT
          const token = createJwt(user.id);

          // respond with the information including token as JSON
          res.status(201).send({ auth: match, token });
        } else {
          throw new Error("Incorrect login information!");
        }
      } else {
        throw new Error("User was not found!");
      }
    })
    .catch((err) => {
      res.status(404).send({ error: err.message });
    });
});

router.post("/logout", function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
