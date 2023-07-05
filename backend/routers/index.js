const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

const { validateLogin, validatePostUser } = require('../middlewares/validaitionInServer');
const { login, postUser, logout } = require('../controllers/users');
const cardRouter = require('./cards');
const userRouter = require('./users');
const auth = require('../middlewares/auth');

router.post('/signin', validateLogin, login);
router.post('/signup', validatePostUser, postUser);
router.get('/signout', logout);
router.use(auth);
router.use('/cards', cardRouter);
router.use('/users', userRouter);
router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
