const router = require('express').Router();
const { validateCardId, validatePostCard } = require('../middlewares/validaitionInServer');
const {
  getCards, deleteCard, postCard, addLike, deleteLike,
} = require('../controllers/cards');

router.get('', getCards);
router.delete('/:cardId', validateCardId, deleteCard);
router.post('', validatePostCard, postCard);
router.put('/:cardId/likes', validateCardId, addLike);
router.delete('/:cardId/likes', validateCardId, deleteLike);

module.exports = router;
