var express = require("express");
var router = express.Router();

/* GET request handler for temporary home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("<h1>Express app</h1>");
});

module.exports = router;
