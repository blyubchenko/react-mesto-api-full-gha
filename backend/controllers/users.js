const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { mongoose } = require('mongoose');
const User = require('../models/user');

const config = require('../config');

const { env, jwtSecret } = config;
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

const findUserById = (userId) => User.findById(userId)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь c указанным _id не найден в БД');
    }
    return user;
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      throw new BadRequestError('Пользователь по указанному _id не найден');
    } else {
      throw err;
    }
  });

const getUserById = (req, res, next) => {
  findUserById(req.params.userId)
    .then((user) => res.status(HTTP_OK).send(user))
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  findUserById(req.user._id)
    .then((user) => res.status(HTTP_OK).send(user))
    .catch(next);
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
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      return next(err);
    });
};

const updateUserData = (userId, newData) => User.findByIdAndUpdate(userId, { $set: newData }, {
  new: true,
  runValidators: true,
})
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    return user;
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError('Переданы некорректные данные');
    } else {
      throw err;
    }
  });

const patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  updateUserData(req.user._id, { name, about })
    .then((user) => res.status(HTTP_OK).send({ user }))
    .catch(next);
};

const patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUserData(req.user._id, { avatar })
    .then((user) => res.status(HTTP_OK).send({ user }))
    .catch(next);
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
        env === 'production' ? jwtSecret : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      return res.status(HTTP_OK).send({ message: 'Вход выполнен' });
    })
    .catch((err) => {
      next(err);
    });
};

const logout = (req, res) => {
  res.cookie('jwt', '', { expires: new Date(0) });
  return res.status(HTTP_OK).send({ message: 'Выход выполнен' });
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
