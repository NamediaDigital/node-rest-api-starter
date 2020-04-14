const express = require('express');
const router = express.Router();
const User = require('../../db/models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.findAll().then((users) => res.status(200).json(JSON.stringify(users)));
});

router.post('/', function (req, res, next) {
  const newUser = req.body;
  User.create(newUser)
    .then((user) => res.status(201).json(JSON.stringify(user)))
    .catch((err) => console.log(err));
});

module.exports = router;
