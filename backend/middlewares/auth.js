const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const config = require('../config');

const { env, jwtSecret } = config;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, env === 'production' ? jwtSecret : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  next();
};
