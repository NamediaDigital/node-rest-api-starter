# RESTful API Starter Code for production.

## Tech Stack: Node, Express, Sequelize, PostgreSQL.

There are two versions of the app

- Version 1: app.js
- Version 2: v2_app.js.

RESTful API Starter Code for production:
https://github.com/NamediaDigital/starter-rest-api-node

## Standard NPM packages for Node-based API projects

- Sessions package: express-session
- Password hashing package: bcrypt
- CSRF (Cross-Site Request Forgery) package: csurf
- Flash error messages: connect-flash
- node’s crypto library creates unique secure values as in generating tokens for emails for resetting passwords
- package for validating and sanitizing user input on the server: express-validator built on top of validator.js library
- Handle images for http requests: multer npm package
- .pdf generation package - creating pdf files on the server: PDFKit

REST API:

- Parse json request objects: npm package body-parser
- Generate JSON web tokens for REST API: jsonwebtoken npm package
- Web sockets package: socket.io. React client npm package: socket.io-client
- Command in macOS terminal: openssl
- Tests for node: mocha - test runner, chai - assertions, ninon - side effects

Prepare REST API app for deployment:

- helmet npm package to secure https response headers
- morgan npm package is for logging request info

GraphQL:

- npm packages: graphql, express-graphql or apollo-server

## Node.js Security Checklist:

- https://blog.risingstack.com/node-js-security-checklist/

## v2_app users:

1. Admin User
   {
   "firstName": "Sergey",
   "lastName": "Nam",
   "email": "sergey@sergey.com",
   "password": "Password123!",
   "confirmPassword": "Password123!"
   }
2. Normal User
   {
   "firstName": "Sergey",
   "lastName": "Nam",
   "email": "sergey@email.com",
   "password": "Password123.",
   "confirmPassword": "Password123."
   }
3. Normal User
   {
   "firstName": "Jackson",
   "lastName": "Hamilton",
   "email": "jackson@email.com",
   "password": "Password123!123",
   "confirmPassword": "Password123!123"
   }
