const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./card');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }));

module.exports = router;
