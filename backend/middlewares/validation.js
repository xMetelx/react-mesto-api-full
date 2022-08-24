const { celebrate, Joi } = require('celebrate');

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/^( http|https):\/\/(www\.)?([a-z0-9\._])+([\w+\-\-._~:/?#\[\]!$&’()*+,;=-])+(#?)/).messages({
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

// ^( http|https):\/\/(www\.)?([a-z0-9\._])+([\w+\-\-._~:/?#\[\]!$&’()*+,;=-])+(#?)    добавить

const avatarValidation = celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(/^( http|https):\/\/(www\.)?([a-z0-9\._])+([\w+\-\-._~:/?#\[\]!$&’()*+,;=-])+(#?)/).messages({
      'string.base': 'Введите URL',
    }),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(/^( http|https):\/\/(www\.)?([a-z0-9\._])+([\w+\-\-._~:/?#\[\]!$&’()*+,;=-])+(#?)/).messages({
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
