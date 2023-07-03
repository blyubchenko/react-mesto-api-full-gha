require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routers/index');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { MONGODB_URI = 'mongodb://127.0.0.1/mestodb' } = process.env;
mongoose.connect(MONGODB_URI, {
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

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаю порт ${PORT}`);
});
