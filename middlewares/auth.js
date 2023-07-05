const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'where-is-the-detonator');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
// const auth = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }

//   const token = authorization.replace('Bearer', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, 'SECRET');
//   } catch (err) {
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }

//   req.user = payload;

//   return next();
// };
