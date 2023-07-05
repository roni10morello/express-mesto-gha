const router = require('express').Router();
const {
  getUsers,
  getUserInfo,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateChangeUser,
  validateChangeAvatar,
} = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:_id', validateUserId, getUserById);
router.patch('/me', validateChangeUser, updateUserInfo);
router.patch('/me/avatar', validateChangeAvatar, updateUserAvatar);

module.exports = router;
