const Card = require('../models/card');
const NotFoundError = require('../utils/errors/NotFoundError'); //  404
const BadRequestError = require('../utils/errors/BadRequestError'); //  400
const ForbiddenError = require('../utils/errors/ForbiddenError'); //  403 - недостаточно прав

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards.reverse());
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => { res.status(201).send(card); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    } else if (req.user._id !== card.owner._id.toString()) {
      throw new ForbiddenError('Не хватает прав для удаления карточки');
    } else {
      Card.findByIdAndRemove(req.params.cardId)
        .then((userCard) => {
          if (!userCard) {
            throw new NotFoundError('Карточка с указанным _id не найдена');
          }
          res.status(200).send({ userCard, message: 'Ваша карточка успешно удалена' });
        })
        .catch(next);
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(BadRequestError('Переданы некорректные данные при удалении карточки'));
    } else {
      next(err);
    }
  });

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
  .then((card) => {
    res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные при удалении карточки'));
    } else {
      next(err);
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
  .then((card) => {
    res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные при удалении карточки'));
    } else {
      next(err);
    }
  });
