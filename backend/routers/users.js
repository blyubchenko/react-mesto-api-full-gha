const router = require('express').Router();
const { validateUserId, validatePatchUserInfo, validatePatchAvatar } = require('../middlewares/validaitionInServer');
const {
  getUsers, getUserById, patchAvatar, patchUserInfo, getUserInfo,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.get('/users/:userId', validateUserId, getUserById);
router.patch('/users/me', validatePatchUserInfo, patchUserInfo);
router.patch('/users/me/avatar', validatePatchAvatar, patchAvatar);

module.exports = router;
