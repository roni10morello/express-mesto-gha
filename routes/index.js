const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./card');
const authRoutes = require('./auth');
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');

router.use(authRoutes);
router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
