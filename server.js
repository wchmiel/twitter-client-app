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

const saveUser = require('./helpers/db/save-user'),
      getAccessToken = require('./helpers/twitter-api/get-access-token'),
      getRequestToken = require('./helpers/twitter-api/get-request-token'),
      addTweet = require('./helpers/twitter-api/add-tweet'),
      getUserDataFromTwitter = require('./helpers/twitter-api/get-user'),
      getFollowersList = require('./helpers/twitter-api/get-followers-list'),
      getFriendsList = require('./helpers/twitter-api/get-friends-list'),
      getUserTimeline = require('./helpers/twitter-api/get-user-timeline'),
      TwitterConfig = require('./data/twitter-config'),
      authenticate = require('./helpers/middlewares/authenticate'),
      User = require('./models/users');


mongoose.connect("mongodb://localhost/tw_app_test");

// CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, X-Auth-Token, x-auth');
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

let req_data;

app.get('/twitter/login', (req, res) => {

  getRequestToken().then((body) => {
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

    getAccessToken({
      oauth_token: oauth_token,
      oauth_token_secret: req_data.oauth_token_secret,
      oauth_verifier: oauth_verifier
    }).then((body) => {

      const authenticate_data = qs.parse(body);
      saveUser(authenticate_data).then((savedUser) => {
        // token is send to client and will be stored in local/session storage
        res.header('Set-Cookie', 'x-auth=' + savedUser.token).render('index.html');
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

app.post('/add/tweet', authenticate, (req, res) => {
  const status = req.body.status;
  addTweet(req.user, status).then((response) => {
    // res.header('x-auth', req.token).send(response);
    res.send(response);
  }).catch((err) => {
    const message = err.message.substring(6);
    const json = JSON.parse(message);
    res.status(400).send(json);
  });
});

app.get('/user/show', authenticate, (req, res) => {
  Promise.all([
    getUserDataFromTwitter(req.user),
    getFollowersList(req.user, 5),
    getFriendsList(req.user),
    getUserTimeline(req.user, 10)])
    .then((data) => {
      res.send({
        user: data[0],
        followers: data[1],
        friends: data[2],
        tweets: data[3]
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.get('/check/authentication', authenticate, (req, res) => {
  res.send({
    authorized: true,
  });
});

app.get('/*', (req, res, next) => {
  res.render('index.html');
});


app.listen(3000, () => {
  console.log('Twitter client app listening on port 3000');
});

module.exports.app = app;
