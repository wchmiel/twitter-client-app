/*jshint esversion: 6 */

const request = require('request'),
      rp = require('request-promise'),
      qs = require('querystring'),
      TwitterConfig = require('../../data/twitter-config');

const addTweet = function(authData, status) {
  return new Promise((resolve, reject) => {

    const options_status_update = {
      method: 'POST',
      uri: 'https://api.twitter.com/1.1/statuses/update.json',
      oauth: {
        consumer_key: TwitterConfig.consumer_key,
        consumer_secret: TwitterConfig.consumer_secret,
        token: authData.tw_oauth_token,
        token_secret: authData.tw_oauth_token_secret
      },
      qs: {
        status: status
      },
      json: true
    };

    rp(options_status_update).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });

  });
};

module.exports = addTweet;
