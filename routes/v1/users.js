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
router.post("/", function (req, res, next) {
  const { firstName, lastName, email, password, confirm_password } = req.body;

  // Check that password and confirmPassword do not match
  if (password !== confirm_password) {
    // HTTP Status Code 400 Bad request
    res
      .status(400)
      .send({ error: "Password and Confirm Password do not match" });
    return;
  }

  // Generate Salt and hash password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      // TODO: Better handle this exception
      throw new Error(err.message);
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        // TODO: Better handle this exception
        throw new Error(err.message);
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
*/
router.patch("/:userId", verifyToken, function (req, res, next) {
  const userId = +req.params.userId === +req.userId && req.userId;
  const data = req.body;
  User.findOne({ where: { id: userId } })
    .then((user) =>
      user
        .update(data)
        .then((user) => {
          res.status(200).send(user);
        })
        .catch((err) => {
          throw new Error(err.message);
        })
    )
    .catch((err) => {
      res.status(404).send({ error: err.message });
    });

  // TODO: Update password
  // Generate Salt and hash password
  // bcrypt.genSalt(saltRounds, function (err, salt) {
  //   if (err) {
  //     // TODO: Better handle this exception
  //     throw new Error(err.message);
  //   }
  //   bcrypt.hash(password, salt, function (err, hash) {
  //     if (err) {
  //       // TODO: Better handle this exception
  //       throw new Error(err.message);
  //     }
  //     Object.assign(data, { password: hash });

  //     User.findOne({ where: { id: userId } })
  //       .then((user) =>
  //         user
  //           .update(data)
  //           .then((user) => {
  //             res.status(200).send(user);
  //           })
  //           .catch((err) => {
  //             throw new Error(err.message);
  //           })
  //       )
  //       .catch((err) => {
  //         throw new Error(err.message);
  //       });
  //   });
  // });
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
