require('./config/env.config');

const express = require('express');
const app = express();

// const morgan = require('morgan');

const bodyParser = require('body-parser');
const cors = require('cors');
const serveStatic = require('serve-static');

const mongoose = require('./services/mongoose.service');

const UsersRouter = require('./routes/users.routes');
const CardsRouter = require('./routes/cards.routes');
const AuthorizationRouter = require('./routes/authentication.routes');

// allows requests from the client to the server
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

// app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// connect routes
UsersRouter.routesConfig(app);
CardsRouter.routesConfig(app);
AuthorizationRouter.routesConfig(app);

// serving distributed version of the client
app.use(serveStatic(__dirname + '/dist'));

// redirects http to https
app.enable('trust proxy');
app.use(function(request, response, next) {
  if (process.env.NODE_ENV != 'dev' && !request.secure) {
     return response.redirect("https://" + request.headers.host + request.url);
  }
  next();
})

// connect to database
mongoose.connectDbWithRetry();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server on port, ${port}`);
})