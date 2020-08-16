const router = require('express').Router();

const articlesRouter = require('./articles');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');
const { signInValid, signUpValid } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');

router.use('/articles', auth, articlesRouter);
router.use('/users', auth, usersRouter);
router.post('/signin', signInValid, login);
router.post('/signup', signUpValid, createUser);

module.exports = router;
