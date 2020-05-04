require("dotenv").config();

// Set up __root directory
global.__root = __dirname + "/";

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const app = express();
const indexRouter = require(__root + "routes/");
const usersRouter = require(__root + "routes/users");
const authenticate = require(__root + "routes/auth/authenticate");
const db = require(__root + "db/connection");
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 8000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

// Routes
app.use("/", indexRouter);
app.use("/v1/auth", authenticate);
app.use("/v1/users", usersRouter);

// Database connection
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
