const usersRouter = require('express').Router();
const { getUser } = require('../controllers/users');

usersRouter.get('/me', getUser); // возвращает информацию о пользователе (email и имя)

module.exports = usersRouter;
