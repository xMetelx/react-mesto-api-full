const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./utils/config');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { userValidation } = require('./middlewares/validation');
const NotFoundError = require('./utils/errors/NotFoundError');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();
const { PORT = 3001 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// const allowedCors = [
//   'http://metel.nomoredomains.sbs',
//   'https://metel.nomoredomains.sbs',
//   'http://api.metel.nomoredomains.sbs',
//   'https://api.metel.nomoredomains.sbs',
// ];

const options = {
  origin: [
    'http://metel.nomoredomains.sbs',
    'https://metel.nomoredomains.sbs',
    'http://api.metel.nomoredomains.sbs',
    'https://api.metel.nomoredomains.sbs',
    'http://localhost:3001',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

mongoose.connect(config.serverDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  // eslint-disable-next-line no-console
  .then(() => console.log('Mongo is ON'))
  // eslint-disable-next-line no-console
  .catch(() => console.log('Mongoose error'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('*', cors(options));

// eslint-disable-next-line
// app.use((req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   } else if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//   next();
// });

app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.post('/signup', userValidation, createUser); // добавить валидацию - мидлвэр
app.post('/signin', userValidation, login);

app.use(auth);

app.use('/cards', cardRouter);
app.use('/users', userRouter);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемой страницы не существует'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? err.message
        : message,
    });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Приложение запущено на ${PORT} порте`);
});
