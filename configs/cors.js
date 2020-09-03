const whitelist = ['https://news-explorer-project.tk', 'http://news-explorer-project.tk', 'https://zakvolz.github.io/news-explorer-frontend', 'https://yadi.sk', 'http://yadi.sk'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = corsOptions;
