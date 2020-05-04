const VerifyUserMiddleware = require(__root + "v2/auth/middleware/verify_user");
const AuthorizationController = require(__root + "v2/auth/controllers");
const AuthValidationMiddleware = require(__root +
  "v2/auth/middleware/validation");

exports.routesConfig = function (app) {
  app.post("/auth", [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login,
  ]);

  app.post("/auth/refresh", [
    AuthValidationMiddleware.validJWTNeeded,
    AuthValidationMiddleware.verifyRefreshBodyField,
    AuthValidationMiddleware.validRefreshNeeded,
    AuthorizationController.login,
  ]);
};
