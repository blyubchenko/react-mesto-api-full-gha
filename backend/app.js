require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const mongoose = require('mongoose');
const config = require('./config');

const { port, mongodbUrl } = config;
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routers/index');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(cookieParser());
app.use(cors);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаю порт ${port}`);
});
