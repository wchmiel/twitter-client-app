/*jshint esversion: 6 */

const express = require('express'),
      app = express(),
      router = express.Router(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      request = require('request'),
      rp = require('request-promise'),
      qs = require('querystring'),
      path = require('path'),
      jwt = require('jsonwebtoken');
      // CircularJSON = require('circular-json'),
      // session = require("express-session"),
      // passport = require("passport"),
      // TwitterStrategy = require("passport-twitter").Strategy,

const saveUser = require('./helpers/db/save-user'),
      addTweet = require('./helpers/twitter-api/add-tweet'),
      getUserDataFromTwitter = require('./helpers/twitter-api/get-user'),
      TwitterConfig = require('./data/twitter-config'),
      authenticate = require('./helpers/middlewares/authenticate'),
      User = require('./models/users');


mongoose.connect("mongodb://localhost/tw_app_test");

// CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, X-Auth-Token');
  res.header('cache-control', 'no-cache');
  next();
});

// app.use(express.static(path.join(__dirname, '/dist')));
app.use('', express.static(path.join(__dirname + '/dist')));

app.set('views', path.join(__dirname, 'dist'));
app.engine('html', require('ejs').renderFile);

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport.use(new TwitterStrategy({
//     consumerKey: 'rddZzwLVJB7Ca4m9WPhjXoE5b',
//     consumerSecret: '0tOsN3Wa6scUDYCBdjl8cGfaS5FY8PJC0JKGBGfyacdWPvbaWM',
//     callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, cb) {
//     // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//     console.log(token);
//     console.log(profile);
//     return cb(null, profile);
//
//     // done(null, profile);
//   }
// ));
//
// passport.serializeUser(function(user, callback) {
//   callback(null, user);
// });
//
// passport.deserializeUser(function(obj, callback) {
//   callback(null, obj);
// });

// app.use(session({
//   secret: 'My twitter app secret',
//   resave: true,
//   saveUninitialized: true
// }));
//
// app.use(passport.initialize());
// app.use(passport.session());


// REUEST METHOD //

let req_data;

app.get('/twitter/login', (req, res) => {
  const options_req_token = {
    uri: 'https://api.twitter.com/oauth/request_token',
    oauth: TwitterConfig
  };

  rp(options_req_token).then((body) => {
    req_data = qs.parse(body);
    const url_authenticate =
      'https://api.twitter.com/oauth/authenticate' + '?' + qs.stringify({oauth_token: req_data.oauth_token});
    res.status(302).redirect(url_authenticate);
  }).catch((err) => {
    res.status(400).send(err);
  });

});


app.use('/auth/twitter/callback', function(req, res) {

  const {oauth_token, oauth_verifier} = res.socket.parser.incoming.query;

  if (oauth_token === req_data.oauth_token) {

    const options_access_token = {
      uri: 'https://api.twitter.com/oauth/access_token',
      oauth: {
        consumer_key: TwitterConfig.consumer_key,
        consumer_secret: TwitterConfig.consumer_secret,
        token: oauth_token,
        token_secret: req_data.oauth_token_secret,
        verifier: oauth_verifier
      }
    };

    rp(options_access_token).then((body) => {

      const authenticate_data = qs.parse(body);
      saveUser(authenticate_data).then((savedUser) => {
        // token is send to client and will be stored in local/session storage
        res.header('x-auth', savedUser.token).redirect('/');
      }).catch((err) => {
        console.log(err);
        res.status(400).send();
      });

    }).catch((err) => {
      res.status(400).send();
    });

  } else {
    res.status(400).send();
  }
});



app.get('/add/tweet', authenticate, (req, res) => {
  addTweet(req.user).then((response) => {
    // res.header('x-auth', req.token).send(response);
    res.send(response);
  }).catch((err) => {
    console.log(err);
    res.status(400).send();
  });
});

app.get('/user/show', authenticate, (req, res) => {
  getUserDataFromTwitter(req.user).then((twUser) => {
    // res.header('x-auth', req.token).json(twUser);
    res.json(twUser);
  }).catch((err) => {
    console.log(err);
    res.status(400).send();
  });
});

app.get('/test', authenticate, (req, res) => {
  console.log('jestem tu');
  res.json('jest polaczenie');
});

app.get('/*', (req, res, next) => {
  console.log('tutaj');
  res.render('index.html');
  // res.sendFile(path.normalize(path.join(__dirname + '/../client/dist/index.html')));
});

app.listen(3000, () => {
  console.log('Twitter client app listening on port 3000');
});
