import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60 * 60 * 24 * 30 ; // 30 days
const SECRET = "W3 Hav3 th3 kn0w h0w";

let authenticate = expressJwt({ secret: SECRET,
algorithms: ['HS256'] });

let generatedAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
  }, SECRET, {
    expiresIn: TOKENTIME // 30 Days
  });
  next();
}

let respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    userId: req.user.id,
    token: req.token
  });
}

let userInfo = (req, res) => {
  res.status(200).json({
  //  userId: req.user.id,
  //  user: req.user.username,
    issue: req.user.iat,
    expire: req.user.exp
  })
}

module.exports = {
  authenticate,
  generatedAccessToken,
  respond
}
