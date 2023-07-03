const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { HTTP_OK, HTTP_CREATED } = require('../errors/errors_status');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(HTTP_OK).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным _id не найден в БД');
      }
      return res.status(HTTP_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Пользователь по указанному _id не найден'));
      } else {
        next(err);
      }
    });
};

const postUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(HTTP_CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь c указанным Email уже зарегистрирован'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      return next(err);
    });
};

const patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { $set: { name, about } }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      return res.status(HTTP_OK).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

const patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { $set: { avatar } }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      return res.status(HTTP_OK).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let foundUser;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      const token = jwt.sign(
        { _id: foundUser._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      return res.status(HTTP_OK).send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Неправильные почта или пароль'));
    });
};

const logout = (req, res) => {
  res.cookie('jwt', '', { expires: new Date(0) });
  return res.status(HTTP_OK).send({ message: 'Выход выполнен' });
};

const getUserInfo = (req, res, next) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  const userId = decodedToken._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  patchUserInfo,
  patchAvatar,
  login,
  getUserInfo,
  logout,
};
