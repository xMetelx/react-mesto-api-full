const { celebrate, Joi } = require('celebrate');

const testExpression = /^( http|https):\/\/(www\.)?([a-z0-9._])+([\w+\-\-._~:/?#[\]!$&’()*+,;=-])+(#?)/;

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(testExpression).messages({
      'string.base': 'Введите URL',
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Проверьте email',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Проверьте пароль',
    }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.empty': 'Проверьте email',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Проверьте пароль',
    }),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const profileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const avatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(testExpression).messages({
      'string.base': 'Введите URL',
    }),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(testExpression).messages({
      'string.base': 'Введите URL',
    }),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  userValidation,
  loginValidation,
  profileValidation,
  avatarValidation,
  cardValidation,
  userIdValidation,
  cardIdValidation,
};
