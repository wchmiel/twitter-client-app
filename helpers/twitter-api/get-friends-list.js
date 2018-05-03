/*jshint esversion: 6 */

const request = require('request'),
      rp = require('request-promise'),
      qs = require('querystring'),
      TwitterConfig = require('../../data/twitter-config');


const getFriendsList = function(authData) {
  return new Promise((resolve, reject) => {
    const options_get_friends_list = {
      uri: 'https://api.twitter.com/1.1/friends/list.json',
      oauth: {
        consumer_key: TwitterConfig.consumer_key,
        consumer_secret: TwitterConfig.consumer_secret,
        token: authData.tw_oauth_token,
        token_secret: authData.tw_oauth_token_secret
      },
      qs: {
        screen_name: authData.tw_screen_name,
        user_id: authData.tw_id_str
      },
      json: true
    };

    rp(options_get_friends_list).then((followers) => {
      resolve(followers);
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = getFriendsList;
