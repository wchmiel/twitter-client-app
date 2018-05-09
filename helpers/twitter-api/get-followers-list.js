/*jshint esversion: 6 */

const request = require('request'),
      rp = require('request-promise'),
      qs = require('querystring'),
      TwitterConfig = require('../../data/prod/twitter-config');


const getFollowersList = function(authData, count) {
  return new Promise((resolve, reject) => {
    const options_get_followers_list = {
      uri: 'https://api.twitter.com/1.1/followers/list.json',
      oauth: {
        consumer_key: TwitterConfig.consumer_key,
        consumer_secret: TwitterConfig.consumer_secret,
        token: authData.tw_oauth_token,
        token_secret: authData.tw_oauth_token_secret
      },
      qs: {
        screen_name: authData.tw_screen_name,
        user_id: authData.tw_id_str,
        count: count
      },
      json: true
    };

    rp(options_get_followers_list).then((followers) => {
      resolve(followers);
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = getFollowersList;
