/*jshint esversion: 6 */

const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      Config = require('../data/prod/config');

const UserSchema = mongoose.Schema({
   tw_id_str: {
     type: String,
     required: true,
     unique: true
   },
   tw_screen_name: {
     type: String,
     required: true
   },
   tw_oauth_token: {
     type: String,
     required: true,
     unique: true
   },
   tw_oauth_token_secret: {
     type: String,
     required: true,
     unique: true
   },
   token: {
     type: String
   }
});

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + (24 * 60), // token set to 24 minutes
      _id: user._id.toHexString()
    },
    Config.jwt_secret
  ).toString();
  user.token = token;

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  return new Promise((resolve, reject) => {
    jwt.verify(token, Config.jwt_secret, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(User.findOne({
          _id: decoded._id,
          token: token
        }));
      }
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
