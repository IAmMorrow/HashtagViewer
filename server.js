import express from 'express';
import config from './config';
import path from 'path';
import expressWs from 'express-ws';
import handleWS from './handleWS';

// Create a new Express application.
var app = express();
expressWs(app);

// Configure view engine to render EJS templates.
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Enabled so we can serve webpacked client side JS
app.use('/static', express.static('dist'));

// Define routes.
app.get('/',
  function (req, res) {
    const appData = {
      user: req.user
    };
    res.render('home', { appData: JSON.stringify(appData) });
  });

app.ws('/tweetWS', handleWS);

app.listen(config.server.port);
