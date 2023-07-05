const router = require('express').Router();
const { validateUserId, validatePatchUserInfo, validatePatchAvatar } = require('../middlewares/validaitionInServer');
const {
  getUsers, getUserById, patchAvatar, patchUserInfo, getUserInfo,
} = require('../controllers/users');

router.get('', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validatePatchUserInfo, patchUserInfo);
router.patch('/me/avatar', validatePatchAvatar, patchAvatar);

module.exports = router;
