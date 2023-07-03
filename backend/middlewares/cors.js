const allowedCors = [
  'http://mesto.blyubchenko.nomoreparties.sbs',
  'https://mesto.blyubchenko.nomoreparties.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
];

// eslint-disable-next-line consistent-return
const cors = (req, res, next) => {
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const { origin } = req.headers;

  res.header('Access-Control-Allow-Credentials', true);
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};

module.exports = cors;
