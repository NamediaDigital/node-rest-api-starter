const express = require("express");
const router = express.Router();
const User = require("../../db/models/user");
const bcrypt = require("bcrypt");
const saltRounds = +process.env.SALT_ROUNDS;

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      throw new Error(err);
    });
});

/* POST - Create a new User */
router.post("/", async function (req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      throw new Error(err);
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        throw new Error(err);
      }
      User.findOrCreate({
        where: { firstName, lastName, email, password: hash },
      })
        .then(([user, created]) => {
          if (created) {
            res.status(201).json(user);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  });
});

/*
PATCH - Update firstName/lastName/email for existing user
TODO: Handle case for updating password
*/
router.patch("/:userId", function (req, res, next) {
  const userId = req.params.userId;
  const data = req.body;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      user
        .update(data)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          throw new Error(err);
        });
      return null;
    })
    .catch((err) => {
      throw new Error(err);
    });
});

/* DELETE User */
router.delete("/:userId", function (req, res, next) {
  const userId = req.params.userId;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      user.destroy({ force: true });
      res.status(200).send("Record was successfully removed!");
    })
    .catch((err) => {
      throw new Error(err);
    });
});

module.exports = router;
