const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/settings');
const { UnauthorizedError, message401 } = require('../errors/errors');

module.exports = (req, res, next) => {
  let token = req.cookies.jwt;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.replace('Bearer ', '');
  }
  if (!token) {
    return next(new UnauthorizedError(message401.login));
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(message401.login));
  }
  req.user = payload;
  return next();
};
