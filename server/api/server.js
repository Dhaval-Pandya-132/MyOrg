import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
require('./services/passport');
import logger from 'morgan';
import mongoose from 'mongoose'
import routes from'./routes/';
import CONSTANT from './constants'

const app = express();

mongoose.connect(CONSTANT.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT");
    next();
});  

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
    }));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

export default app;
