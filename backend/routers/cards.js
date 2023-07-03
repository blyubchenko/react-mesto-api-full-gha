const router = require('express').Router();
const { validateCardId, validatePostCard } = require('../middlewares/validaitionInServer');
const {
  getCards, deleteCard, postCard, addLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', validateCardId, deleteCard);
router.post('/cards', validatePostCard, postCard);
router.put('/cards/:cardId/likes', validateCardId, addLike);
router.delete('/cards/:cardId/likes', validateCardId, deleteLike);

module.exports = router;
