// Environment Variables
require("dotenv").config();

// Set up __root directory
global.__root = __dirname + "/";

// Require version 2 of the main app
const v2_app = require("./v2/app");

// Run the v2/app.js
v2_app;
