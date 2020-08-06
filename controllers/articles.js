const Article = require('../models/article');
const {
  NotFoundError, message404, ForbiddenError, message403,
} = require('../errors/errors');

// Получение всех статей
module.exports.getArticles = async (req, res, next) => {
  try {
    const item = await Article.find({})
      .populate('owner');
    return res.send({
      data: item,
    });
  } catch (err) {
    return next(err);
  }
};

// Создание статьи
module.exports.createArticle = async (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  try {
    const item = await Article.create({
      keyword, title, text, date, source, link, image, owner: req.user._id,
    });
    const populate = await Article.findById(item._id)
      .populate('owner');
    return res.send({ data: populate });
  } catch (err) {
    return next(err);
  }
};

// Удаление статьи
module.exports.deleteArticle = async (req, res, next) => {
  try {
    const obj = await Article.findById(req.params._id)
      .select('+owner')
      .orFail(new NotFoundError(message404.missing));
    if (req.user._id !== obj.owner.toString()) {
      throw new ForbiddenError(message403.delete);
    }
    const elemArticle = await Article.findByIdAndDelete(req.params._id)
      .populate('owner');
    return res.send(elemArticle);
  } catch (err) {
    return next(err);
  }
};
