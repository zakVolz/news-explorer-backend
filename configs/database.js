const { NODE_ENV, DATABASE_URL } = process.env;

// Присваивание адреса базы данных в production-режиме
const mongoDbAdress = NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/news-explorer-dev';
// Настройки базы данных
const mongoDbSettings = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = { mongoDbAdress, mongoDbSettings };
