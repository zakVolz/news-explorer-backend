const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configs/settings');
const {
  ConflictingRequest, message409, BadRequestError, message400,
} = require('../errors/errors');

// Получение информации о позьзователе
module.exports.getUser = async (req, res, next) => {
  try {
    const profile = await User.findById(req.user._id);
    return res.send({
      email: profile.email,
      name: profile.name,
      _id: profile._id,
    });
  } catch (err) {
    return next(err);
  }
};

// Создание пользователя
module.exports.createUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name });
    return res.send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err.errors.email && err.errors.email.kind === 'unique') {
      return next(new ConflictingRequest(message409.email));
    }
    return next(err);
  }
};

// Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (password && email !== null) {
    return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        });
        res.send({
          message: 'Successful authorization',
          jwt: token,
        });
      }).catch(next);
  }
  throw new BadRequestError(message400.data);
};
