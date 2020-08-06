const message400 = {
  data: 'Incorrect email or password',
  email: 'is invalid email address',
  link: 'is invalid link',
  required: 'is required',
};

const message401 = {
  login: 'You need to login',
};

const message403 = {
  delete: 'You can only delete your own articles',

};

const message404 = {
  request: 'The requested resource was not found',
  missing: 'The article is missing',
};

const message409 = {
  email: 'Email is already in use',
};

const message500 = {
  server: 'An error occurred on the server',
};

module.exports = {
  message400,
  message401,
  message403,
  message404,
  message409,
  message500,
};
