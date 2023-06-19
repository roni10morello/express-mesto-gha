const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.log(`Connection is fail ${err}`);
  });

app.use((req, res, next) => {
  req.user = {
    _id: '648f447d4ecee5fa67766917',
  };

  next();
});

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT);
