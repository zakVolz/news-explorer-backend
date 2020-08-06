const BadRequestError = require('./badRequest'); // 400
const UnauthorizedError = require('./unauthorized'); // 401
const ForbiddenError = require('./forbidden'); // 403
const NotFoundError = require('./notFound'); // 404
const ConflictingRequest = require('./conflictingRequest'); // 409

const {
  message400, message401, message403, message404, message409, message500,
} = require('./messages');

module.exports = {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ConflictingRequest,
  message400,
  message401,
  message403,
  message404,
  message409,
  message500,
};
