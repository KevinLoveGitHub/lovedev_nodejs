import express from 'express';
import connectMongo from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import config from 'config-lite';
import history from 'connect-history-api-fallback';
import router from './routes/index.js';
import db from './db/db.js';
import path from 'path';
import expressWinston from 'express-winston';
import winston from 'winston';


const app = express();

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
app.listen(config.port);
app.use(express.static('./public'));
app.use(history());
