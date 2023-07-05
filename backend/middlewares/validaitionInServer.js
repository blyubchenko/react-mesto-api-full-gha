const { celebrate, Joi } = require('celebrate');

const regUrlLink = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]){1,}\.([a-zA-Z0-9]){1,}(\/([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]){1,})?/;

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validatePostCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regUrlLink),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const validatePatchUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validatePatchAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regUrlLink),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validatePostUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regUrlLink),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateCardId,
  validatePostCard,
  validateUserId,
  validatePatchUserInfo,
  validatePatchAvatar,
  validateLogin,
  validatePostUser,
};
