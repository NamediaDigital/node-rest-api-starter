const UserModel = require(__root + "db/models/v2/user");
const crypto = require("crypto");

exports.insert = (req, res) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  delete req.body.confirmPassword;

  UserModel.createUser(req.body)
    .then(([newUser, created]) => {
      if (created) {
        return res.status(201).send({ id: newUser.id });
      }
    })
    .catch((err) => {
      res.status(500).send({ error: "Server unable to create new user" });
    });
};

exports.list = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 25;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  UserModel.list(limit, page).then((result) => {
    res.status(200).send(result);
  });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};

exports.patchById = (req, res) => {
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
    delete req.body.confirmPassword;
  }

  UserModel.patchUser(req.params.userId, req.body).then((result) => {
    res.status(204).send({});
  });
};

exports.removeById = (req, res) => {
  UserModel.removeById(req.params.userId).then((result) => {
    res.status(204).send({});
  });
};
