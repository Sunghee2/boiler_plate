import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import createError from 'http-errors';
import cors from 'cors';
import config from '@peerdatalab/config';

import indexRouter from './routes';

const port = config.serverPort || 5000;
const app = express();

app.use(helmet());

app.use(morgan('dev'));
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use('/', indexRouter);

app.listen(port, () => console.log(`Server is running on PORT: ${port}`));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
