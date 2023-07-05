const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  OK,
  CREATED,
} = require('../utils/error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(OK).send(cards);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(cardId).then(() => res.status(OK).send(card));
      } else {
        next(new ForbiddenError('Нет прав доступа для удаления карточки'));
      }
    })
    .catch(next);
};

// const deleteCard = (req, res, next) => {
//   const { cardId } = req.params;
//   //const userId = req.user._id;
//   Card.findById(cardId)
//     .then((card) => {
//       if (!card) {
//         next(new NotFoundError('Карточка не найдена'));
//       }
//       if (card.owner.toString() !== req.user._id) {
//         next(new ForbiddenError('Нет прав доступа для удаления карточки'));
//       }
//     });
//   Card.findByIdAndRemove(cardId)
//     .then((card) => {
//       res.status(OK).send(card);
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError' || err.name === 'CastError') {
//         next(new BadRequestError('Переданы некорректные данные'));
//       } else next(err);
//     });
// };

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => {
      res.status(CREATED).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(OK).send(card);
      } else {
        next(new NotFoundError('Карточка не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(OK).send(card);
      } else {
        next(new NotFoundError('Карточка не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
