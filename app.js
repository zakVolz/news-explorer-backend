require('dotenv').config();
const helmet = require('helmet');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { mongoDbAdress, mongoDbSettings } = require('./configs/database');
const limiter = require('./configs/limiter');
const { PORT } = require('./configs/settings');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { notFound, centralizedProcessing } = require('./middlewares/errorHandler');

// Подключение к базе данных
mongoose.connect(mongoDbAdress, mongoDbSettings);

app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(router);

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок Celebrate
app.use(errors());

// Обработчик ошибки 404
app.use('*', notFound);

// Централизованный обработчик ошибок
app.use(centralizedProcessing);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is running on the port:${PORT}`);
});
