/*jshint esversion: 6 */

const User = require('../../models/users');

const saveUser = function(authData) {

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
};

module.exports = saveUser;
