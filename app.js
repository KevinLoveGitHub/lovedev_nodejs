import express from 'express';
import connectMongo from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import config from 'config-lite';
import history from 'connect-history-api-fallback';
import router from './routes/index.js';
import cors from 'cors';
import errorhandler from 'errorhandler';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import db from './db/db.js';
import path from 'path';
import expressWinston from 'express-winston';
import winston from 'winston';

import passPort from './config/passport';

const app = express();
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  app.use(errorhandler());
}

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});


const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: config.session.cookie,
  store: new MongoStore({
    url: config.url
  })
}));

app.use(expressWinston.logger({
    transports: [
      new (winston.transports.Console)({
        json: true,
        colorize: true
      }),
      new winston.transports.File({
        filename: 'logs/success.log'
      })
    ]
  }
));

router(app);

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));
app.use(express.static(__dirname + '/public'));
app.use(history());

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      'errors': {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(config.port || 3000, function () {
  console.log('Listening on port ' + server.address().port);
});