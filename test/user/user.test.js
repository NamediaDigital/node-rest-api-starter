// const app = require(__root + "v2/app");
// const request = require("supertest").agent;
// const expect = require("chai").expect;
// const jwtService = require(__root + "v2/auth/controllers");

// let firstUserIdTest = "";
// let firstUserBody = {
//   name: "Billie Eilish",
//   email: "billie@eilish.com",
//   password: "Password123!!!",
// };

// let jwt = {
//   accessToken: "",
//   refreshToken: "",
// };

// const adminJWT = jwtService.generateToken(2147483647);

// it("should POST /users", async function () {
//   const res = await request(app).post("/users").send(firstUserBody);
//   expect(res.status).to.equal(201);
//   expect(res.body).not.to.be.empty;
//   expect(res.body).to.be.an("object");
//   expect(res.body._id).to.be.an("string");
//   firstUserIdTest = res.body._id;
// });

// it(`should POST to /auth and retrieve an access token`, async () => {
//   const res = await request(app).post("/auth").send({
//     email: firstUserBody.email,
//     password: firstUserBody.password,
//   });
//   expect(res.status).to.equal(201);
//   expect(res.body).not.to.be.empty;
//   expect(res.body).to.be.an("object");
//   expect(res.body.accessToken).to.be.an("string");
//   expect(res.body.refreshToken).to.be.an("string");
//   jwt.accessToken = res.body.accessToken;
//   jwt.refreshToken = res.body.refreshToken;
// });

// it(`should GET /users/:userId`, async function () {
//   const res = await request(app)
//     .get(`/users/${firstUserIdTest}`)
//     .set("Accept", "application/json")
//     .set("Authorization", `Bearer ${jwt.accessToken}`)
//     .send();
//   expect(res.status).to.equal(200);
//   expect(res.body).not.to.be.empty;
//   expect(res.body).to.be.an("object");

//   expect(res.body._id).to.be.an("string");
//   expect(res.body.name).to.be.equals(firstUserBody.name);
//   expect(res.body.email).to.be.equals(firstUserBody.email);
//   expect(res.body.permissionLevel).to.be.equals(15);
//   expect(res.body._id).to.be.equals(firstUserIdTest);
// });

// it(`should GET /users`, async function () {
//   const res = await request(app)
//     .get(`/users`)
//     .set("Accept", "application/json")
//     .set("Authorization", `Bearer ${adminJWT}`)
//     .send();
//   expect(res.status).to.equal(200);
//   expect(res.body).not.to.be.empty;
//   expect(res.body).to.be.an("array");

//   expect(res.body[0]._id).to.be.an("string");
//   expect(res.body[0].name).to.be.equals(firstUserBody.name);
//   expect(res.body[0].email).to.be.equals(firstUserBody.email);
//   expect(res.body[0]._id).to.be.equals(firstUserIdTest);
// });

// it("should PUT /users/:userId", async function () {
//   const name = "Jose";
//   const res = await request(app)
//     .put(`/users/${firstUserIdTest}`)
//     .set("Accept", "application/json")
//     .set("Authorization", `Bearer ${jwt.accessToken}`)
//     .send({
//       name: name,
//       email: firstUserBody.email,
//     });
//   expect(res.status).to.equal(204);
// });

// it(`should GET /users/:userId to have a new name`, async function () {
//   const res = await request(app)
//     .get(`/users/${firstUserIdTest}`)
//     .set("Accept", "application/json")
//     .set("Authorization", `Bearer ${jwt.accessToken}`)
//     .send();
//   expect(res.status).to.equal(200);
//   expect(res.body).not.to.be.empty;
//   expect(res.body).to.be.an("object");

//   expect(res.body._id).to.be.an("string");
//   expect(res.body.name).to.be.not.equals(firstUserBody.name);
//   expect(res.body.email).to.be.equals(firstUserBody.email);
//   expect(res.body._id).to.be.equals(firstUserIdTest);
// });

// it("should PATCH /users/:userId", async function () {
//   let newField = { description: "My user description" };
//   const res = await request(app)
//     .patch(`/users/${firstUserIdTest}`)
//     .set("Accept", "application/json")
//     .set("Authorization", `Bearer ${jwt.accessToken}`)
//     .send(newField);
//   expect(res.status).to.equal(204);
// });

// it(`should GET /users/:userId to have a new field called description`, async function () {
//   const res = await request(app)
//     .get(`/users/${firstUserIdTest}`)
//     .set("Accept", "application/json")
//     .set("Authorization", `Bearer ${jwt.accessToken}`)
//     .send();
//   expect(res.status).to.equal(200);
//   expect(res.body).not.to.be.empty;
//   expect(res.body).to.be.an("object");
//   expect(res.body._id).to.be.an("string");
//   expect(res.body.description).to.be.equals("My user description");
// });

// it("should DELETE /users/:userId", async function () {
//   const res = await request(app)
//     .delete(`/users/${firstUserIdTest}`)
//     .set("Accept", "application/json")
//     .set("Authorization", `Bearer ${jwt.accessToken}`)
//     .send();
//   expect(res.status).to.equal(204);
// });

// it(`should GET /users and receive a 403 for not being an ADMIN`, async function () {
//   const res = await request(app)
//     .get(`/users`)
//     .set("Accept", "application/json")
//     .set("Authorization", `Bearer ${jwt.accessToken}`)
//     .send();
//   expect(res.status).to.equal(403);
// });
