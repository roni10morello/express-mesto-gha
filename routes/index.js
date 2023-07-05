const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./card');
const NotFoundError = require('../errors/not-found-error');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
