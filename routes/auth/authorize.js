const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Used as verifyToken middleware
module.exports = function (req, res, next) {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    jwt.verify(token, jwtSecret, function (err, decoded) {
      // Might need to pass err object to next later.
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });

      // if everything is good, save userId to request for use in other routes
      req.userId = decoded.userId;
      next();
    });
  } else {
    // If header is undefined return Forbidden (403)
    res.status(403).send({ auth: false, message: "Access forbidden." });
  }
};
