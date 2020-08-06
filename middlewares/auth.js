const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/settings');
const { UnauthorizedError, message401 } = require('../errors/errors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
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
