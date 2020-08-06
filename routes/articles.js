const articlesRouter = require('express').Router();
const { articleValid, validId } = require('../middlewares/validation');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

articlesRouter.get('/', getArticles); // возвращает все сохранённые пользователем статьи
articlesRouter.post('/', articleValid, createArticle); // создаёт статью
articlesRouter.delete('/:_id', validId, deleteArticle); // удаляет сохранённую статью  по _id

module.exports = articlesRouter;
