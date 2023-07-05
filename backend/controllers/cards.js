const { default: mongoose } = require('mongoose');
const Card = require('../models/card');
const { HTTP_OK, HTTP_CREATED } = require('../errors/errors_status');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request');

const getCards = (req, res, next) => {
  Card.find()
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      const reversedCards = cards.reverse();
      res.status(HTTP_OK).send(reversedCards);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError('Нельзя удалять чужие карточки');
      }
      return Card.deleteOne();
    })
    .then(() => res.status(HTTP_OK).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Переданы некорректные данные для удаления карточки'));
      } else {
        next(err);
      }
    });
};

const postCard = (req, res, next) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => Card.findById(card._id).populate('owner'))
    .then((card) => res.status(HTTP_CREATED).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      return res.status(HTTP_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      return res.status(HTTP_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Переданы некорректные данные для удаления лайка'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  deleteCard,
  postCard,
  addLike,
  deleteLike,
};
