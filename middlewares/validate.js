const { celebrate, Joi } = require('celebrate');
const URL_PATTERN = require('../utils/constants');

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_PATTERN),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

const validateChangeUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateChangeAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(URL_PATTERN),
  }),
});

module.exports = {
  validateSignIn,
  validateSignUp,
  validateUserId,
  validateChangeUser,
  validateChangeAvatar,
};