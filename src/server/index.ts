import * as express from 'express';
import * as session from 'express-session';
import wds from './wds';
import ssr from './ssr';
import * as userController from "./controllers/user";
import * as passportConfig from "./config/passport";
import * as mongo from 'connect-mongo';
import { MONGODB_URI, SESSION_SECRET } from './util/secrets'; 
import * as mongoose from "mongoose";
import * as bluebird from 'bluebird';
import * as passport from 'passport';
import * as lusca from "lusca";
import * as flash from "express-flash";
import * as expressValidator from 'express-validator';
import * as bodyParser from 'body-parser';
import auth from './routes/auth';
import quiz from './routes/quiz';
import community from './routes/community';
import * as listEndpoints from 'express-list-endpoints';

const MongoStore = mongo(session);

if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'production';
}

const isDevelopment = process.env.NODE_ENV === 'development';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEV__ = isDevelopment;
global.__TEST__ = false;

const config = require('../../config')(process.env.NODE_ENV);
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;

(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, { useNewUrlParser: true}).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

if (isDevelopment) {
  wds(app);
} else {
  app.use(config.PUBLIC_PATH, express.static(config.PUBLIC_FOLDER));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
// app.use((req, res, next) => {
//   // // After successful login, redirect back to the intended page
//   // if (!req.user &&
//   //   req.path !== "/login" &&
//   //   req.path !== "/signup" &&
//   //   !req.path.match(/^\/auth/) &&
//   //   !req.path.match(/\./)) {
//   //   req.session.returnTo = req.path;
//   // } else if (req.user &&
//   //   req.path == "/account") {
//   //   req.session.returnTo = req.path;
//   // }
//   next();
// });


app.use('/auth', auth);
app.use('/api/quiz', quiz);
app.use('/api/community', community);
app.get('*', ssr);

console.log(listEndpoints(app));

app.listen(config.PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log('===> Starting Server . . .');
  console.log('===> Port: ' + config.PORT);
  console.log('===> Environment: ' + process.env.NODE_ENV, ', isDevelopment', isDevelopment);
  console.log('===> Database: ' + MONGODB_URI);
});
