/*jshint esversion: 6 */

const express = require('express'),
      app = express(),
      router = express.Router(),
      bodyParser = require('body-parser'),
      // cors = require('cors'),
      mongoose = require('mongoose'),
      request = require('request'),
      TwitterConfig = require('./data/twitter-config'),
      rp = require('request-promise'),
      qs = require('querystring'),
      path = require('path'),
      jwt = require('jsonwebtoken'),
      User = require('./models/users');
      // CircularJSON = require('circular-json'),
      // session = require("express-session"),
      // passport = require("passport"),
      // TwitterStrategy = require("passport-twitter").Strategy,
      // Twitter = require('twitter-node-client').Twitter;


mongoose.connect("mongodb://localhost/tw_app_test");

// app.use(cors());

// CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, X-Auth-Token');
  res.header('cache-control', 'no-cache');
  // res.header('Access-Control-Allow-Headers', '*');
  next();
});

// app.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

// app.use(express.static(path.join(__dirname, '/dist')));
app.use('', express.static(path.join(__dirname + '/dist')));

app.set('views', path.join(__dirname, 'dist'));
app.engine('html', require('ejs').renderFile);


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


// var twitter = new Twitter({
//   consumerKey: "rddZzwLVJB7Ca4m9WPhjXoE5b",
//   consumerSecret: "0tOsN3Wa6scUDYCBdjl8cGfaS5FY8PJC0JKGBGfyacdWPvbaWM",
//   accessToken: "756759456831115264-xgKAbrLNPB8jTheZNq6IgKEMcKEzCoT",
//   accessTokenSecret: "q2KSorq6MA513aSmae0po5VVe49oc7rfX0g7igQjsDSLE",
//   callBackUrl: "http://127.0.0.1:3000/auth/twitter/callback"
// });

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//   secret: 'My twitter app secret',
//   resave: true,
//   saveUninitialized: true
// }));
//
// app.use(passport.initialize());
// app.use(passport.session());

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
  res.json('poszlooo!');
});

// app.get('/wojo2', passport.authenticate('twitter'), function(req, res) {
//   console.log('Mam to redirect!');
//   res.json('poszlooo!');
// });

// app.get('/login', function(req, res) {
//   res.redirect('/twitter/login');
// });

// app.options('/twitter/login', cors());
// app.get('/twitter/login', passport.authenticate('twitter'));

// app.options('/auth/twitter/callback', cors());
// app.use('/auth/twitter/callback', passport.authenticate('twitter', {
//   failureRedirect: '/wojo'
// }), function(req, res) {
//   console.log('succesfully authenticated user');
//   userData = res;
//   const response = CircularJSON.stringify(res);
//   // res.send(response);
//   res.redirect('/');
// });



// REUEST METHOD //

// const baseOauth = {
//   callback: 'http://127.0.0.1:3000/auth/twitter/callback',
//   consumer_key: "rddZzwLVJB7Ca4m9WPhjXoE5b",
//   consumer_secret: "0tOsN3Wa6scUDYCBdjl8cGfaS5FY8PJC0JKGBGfyacdWPvbaWM"
// };

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



app.get('/add/tweet', (req, res) => {
  const options_status_update = {
    method: 'POST',
    uri: 'https://api.twitter.com/1.1/statuses/update.json' + '?' + qs.stringify({status: 'aaaasdadasd.'}),
    oauth: {
      consumer_key: TwitterConfig.consumer_key,
      consumer_secret: TwitterConfig.consumer_secret,
      token: '756759456831115264-fFTHHFHPDCFhAg16x4dEr83jRMV8qsi',
      token_secret: 'QdE1VjIVRxOyPqXFlkojIH1lZnMtRf5a2m6i4bzNlqAYq'
    }
  };

  rp(options_status_update).then((res) => {
    console.log('dodano');
    res.send({"message": "dodano tweeta"});
  }).catch((err) => {
    res.json(err);
  });
});

// app.get('/check/credentials', (req, res) => {
//   const opt = {
//     uri: 'https://api.twitter.com/1.1/account/verify_credentials.json',
//     oauth: {
//       consumer_key: TwitterConfig.consumer_key,
//       consumer_secret: TwitterConfig.consumer_secret,
//       token: '756759456831115264-fFTHHFHPDCFhAg16x4dEr83jRMV8qsi',
//       token_secret: 'QdE1VjIVRxOyPqXFlkojIH1lZnMtRf5a2m6i4bzNlqAYq'
//     }
//   };
//
//   rp(opt).then((res) => {
//     console.log('sprawdzono');
//     console.log(JSON.parse(res));
//     res.json(res);
//   }).catch((err) => {
//     res.json(err);
//   });
// });



app.get('/*', (req, res, next) => {
  console.log('tutaj');
  res.render('index.html');
  // res.sendFile(path.normalize(path.join(__dirname + '/../client/dist/index.html')));
});


app.listen(3000, () => {
  console.log('Twitter client app listening on port 3000');
});



function saveUser(authData) {

  return new Promise((resolve, reject) => {
    User.findOne({tw_id_str: authData.user_id, tw_screen_name: authData.screen_name}, (error, user) => {
      if (user) {

        user.tw_oauth_token = authData.oauth_token;
        user.tw_oauth_token_secret = authData.oauth_token_secret;
        user.generateAuthToken();
        user.save().then(() => {
          resolve(user);
        }).catch((err) => {
          reject(err);
        });

      } else {

        const newUser = new User({
          tw_id_str: authData.user_id,
          tw_screen_name: authData.screen_name,
          tw_oauth_token: authData.oauth_token,
          tw_oauth_token_secret: authData.oauth_token_secret
        });
        newUser.save().then(() => {
          return newUser.generateAuthToken();
        }).then(() => {
          resolve(newUser);
        }).catch((err) => {
          reject(err);
        });

      }
    });
  });
}


function getUserDataFromTwitter(authData) {
  return new Promise((resolve, reject) => {
    const options_get_user = {
      uri: 'https://api.twitter.com/1.1/users/show.json',
      oauth: {
        consumer_key: TwitterConfig.consumer_key,
        consumer_secret: TwitterConfig.consumer_secret,
        token: authData.oauth_token,
        token_secret: authData.oauth_token_secret
      },
      qs: {
        screen_name: authData.screen_name,
        user_id: authData.user_id
      },
      json: true
    };

    rp(options_get_user).then((twitterUser) => {
      resolve(twitterUser);
    }).catch((err) => {
      reject(err);
    });
  });
}
