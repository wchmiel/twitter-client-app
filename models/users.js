/*jshint esversion: 6 */

const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      Config = require('../data/config');

const userSchema = mongoose.Schema({
   // tw_id: {
   //   type: String,
   //   required: true,
   //   unique: true
   // },
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
   // tokens: [{
   //   token: {
   //     type: String,
   //     required: true
   //   }
   // }]
   token: {
     type: String
   }
});

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toHexString()}, Config.jwt_secret).toString();
  user.token = token;

  return user.save().then(() => {
    return token;
  });
};

module.exports = mongoose.model('User', userSchema);
