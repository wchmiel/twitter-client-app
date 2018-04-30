/*jshint esversion: 6 */

const express = require('express'),
      app = express(),
      router = express.Router(),
      path = require('path'),
      CircularJSON = require('circular-json'),
      bodyParser = require("body-parser"),
      session = require("express-session"),
      passport = require("passport"),
      TwitterStrategy = require("passport-twitter").Strategy,
      Twitter = require('twitter-node-client').Twitter;

let userData = null;

// CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('cache-control', 'no-cache');
  // res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// app.use(express.static(path.join(__dirname, '/dist')));
app.use('', express.static(path.join(__dirname + '/dist')));

app.set('views', path.join(__dirname, 'dist'));
app.engine('html', require('ejs').renderFile);


passport.use(new TwitterStrategy({
    consumerKey: 'rddZzwLVJB7Ca4m9WPhjXoE5b',
    consumerSecret: '0tOsN3Wa6scUDYCBdjl8cGfaS5FY8PJC0JKGBGfyacdWPvbaWM',
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    // console.log(profile);
    return cb(null, profile);

    // done(null, profile);
  }
));

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});


var twitter = new Twitter({
  consumerKey: "rddZzwLVJB7Ca4m9WPhjXoE5b",
  consumerSecret: "0tOsN3Wa6scUDYCBdjl8cGfaS5FY8PJC0JKGBGfyacdWPvbaWM",
  accessToken: "756759456831115264-xgKAbrLNPB8jTheZNq6IgKEMcKEzCoT",
  accessTokenSecret: "q2KSorq6MA513aSmae0po5VVe49oc7rfX0g7igQjsDSLE",
  callBackUrl: "http://127.0.0.1:3000/auth/twitter/callback"
});

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'My twitter app secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// twitter.getUserTimeline({ screen_name: 'realDonaldTrump', count: '2'}, function(err) {
//   console.log(err);
// }, function(data) {
//   const userData = JSON.parse(data);
//   console.log(userData);
// });

// twitter.getCustomApiCall('/statuses/home_timeline.json', {screen_name: 'Wojo_Chmiel', count: 2}, function(err) {
//   console.log(err);
// }, function(data) {
//     const userData = JSON.parse(data);
//     console.log(userData);
// });
// twitter.postCustomApiCall('/statuses/update.json', {status: 'This is easy.'}, function(err) {
//   console.log(err);
// }, function(data) {
//     const userData = JSON.parse(data);
//     console.log(userData);
// });

// twitter.postCustomApiCall('/oauth/request_token.json', function(err) {
//   console.log(err);
// }, function(data) {
//     const userData = JSON.parse(data);
//     console.log(userData);
// });

// twitter.postTweet({status: 'Test. :D'}, function(err) {
//   console.log(err);
// }, function(data) {
//     const userData = JSON.parse(data);
//     console.log(userData);
// });

// app.get('/', function(req, res) {
//   console.log(res);
// });

app.get('/wojo', function(req, res) {
  res.redirect('/wojo2');
});

app.get('/wojo2', passport.authenticate('twitter'), function(req, res) {
  console.log('Mam to redirect!');
  res.json('poszlooo!');
});

app.get('/twitter/login', passport.authenticate('twitter'));

app.use('/auth/twitter/callback', passport.authenticate('twitter', {
  failureRedirect: '/wojo'
}), function(req, res) {
  console.log('succesfully authenticated user');
  userData = res;
  const response = CircularJSON.stringify(res);
  // res.send(response);
  res.redirect('/');
});

app.get('/*', (req, res, next) => {
  console.log('tutaj');
  console.log(userData);
  res.render('index.html', {
    userData: userData
  });
  // res.sendFile(path.normalize(path.join(__dirname + '/../client/dist/index.html')));
});


app.listen(3000, () => {
  console.log('Twitter client app listening on port 3000');
});
