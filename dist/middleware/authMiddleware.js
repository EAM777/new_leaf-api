'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKENTIME = 60 * 60 * 24 * 30; // 30 days
var SECRET = "W3 Hav3 th3 kn0w h0w";

var authenticate = (0, _expressJwt2.default)({ secret: SECRET,
  algorithms: ['HS256'] });

var generatedAccessToken = function generatedAccessToken(req, res, next) {
  req.token = req.token || {};
  req.token = _jsonwebtoken2.default.sign({
    id: req.user.id
  }, SECRET, {
    expiresIn: TOKENTIME // 30 Days
  });
  next();
};

var respond = function respond(req, res) {
  res.status(200).json({
    user: req.user.username,
    userId: req.user.id,
    token: req.token
  });
};

var userInfo = function userInfo(req, res) {
  res.status(200).json({
    //  userId: req.user.id,
    //  user: req.user.username,
    issue: req.user.iat,
    expire: req.user.exp
  });
};

module.exports = {
  authenticate: authenticate,
  generatedAccessToken: generatedAccessToken,
  respond: respond
};
//# sourceMappingURL=authMiddleware.js.map