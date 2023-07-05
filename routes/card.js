const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateDeleteCard,
  validateCreateCArd,
  validateLikeCard,
  validateDisLikeCard,
} = require('../middlewares/validate');

router.get('/', getCards);

router.delete('/:cardId', validateDeleteCard, deleteCard);

router.post('/', validateCreateCArd, createCard);

router.put('/:cardId/likes', validateLikeCard, likeCard);

router.delete('/:cardId/likes', validateDisLikeCard, dislikeCard);

module.exports = router;
