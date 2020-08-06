const { celebrate, Joi } = require('celebrate');
const { BadRequestError, message400 } = require('../errors/errors');

const isUrl = (/http[s]?:\/\/(((\d{1,3}\.){3}\d{1,3})|(([a-zA-Z/\d-]+\.)?[[a-zA-Z/\d-]+\.[a-zA-Z]+))(:\d{2,5})?(\/[a-zA-Z/\d-]+#?)?/);

// Валидация Joi для роутов, получающих на вход id
const validId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
});

// Валидация Joi для роута создания статьи
const articleValid = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(isUrl).error((err) => {
      if (err[0].code === 'any.required') {
        return new BadRequestError(`/link/ ${message400.required}`);
      }
      return new BadRequestError(`${err[0].local.value} ${message400.link}`);
    }),
    image: Joi.string().required().regex(isUrl).error((err) => {
      if (err[0].code === 'any.required') {
        return new BadRequestError(`/image/ ${message400.required}`);
      }
      return new BadRequestError(`${err[0].local.value} ${message400.link}`);
    }),
  }),
});

// Валидация Joi для роута авторизации
const signInValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(8),
  }),
});

// Валидация Joi для роута регистрации
const signUpValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validId,
  articleValid,
  signInValid,
  signUpValid,
};
