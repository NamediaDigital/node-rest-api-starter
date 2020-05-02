const express = require("express");
const router = express.Router();
const User = require(__root + "db/models/user");
const bcrypt = require("bcrypt");
const saltRounds = +process.env.SALT_ROUNDS;
const createJwt = require("./auth/createJwt");
const verifyToken = require("./auth/authorize");

/* GET users listing. */
router.get("/", verifyToken, function (req, res, next) {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

/* POST - Register/Create a new User */
router.post("/", async function (req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  // Generate Salt and hash password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      // TODO: Better handle this exception
      throw new Error(err);
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        // TODO: Better handle this exception
        throw new Error(err);
      }

      // Create new User, or find existing user
      User.findOrCreate({
        where: { firstName, lastName, email, password: hash },
      })
        .then(([user, created]) => {
          if (created) {
            const token = createJwt(user.id);
            res.status(201).send({ auth: true, token: token });
          }
        })
        .catch((err) => {
          res.status(500).send({ error: err.message });
        });
    });
  });
});

/*
PATCH - Update firstName/lastName/email for existing user
TODO: Handle case for updating password
*/
router.patch("/:userId", verifyToken, function (req, res, next) {
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
router.delete("/:userId", verifyToken, function (req, res, next) {
  const userId = req.params.userId;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      user.destroy({ force: true });
      res.status(200).send("Record was successfully removed!");
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

module.exports = router;
