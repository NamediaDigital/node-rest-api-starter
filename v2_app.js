// Environment Variables
require("dotenv").config();

// Set up __root directory
global.__root = __dirname + "/";

// Run the v2/app.js
require("./v2/app");
