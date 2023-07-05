const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const { validateSignIn, validateSignUp } = require('./middlewares/validate')

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.log(`Connection is fail ${err}`);
  });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use('/', routes);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
