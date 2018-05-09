/*jshint esversion: 6 */

const request = require('request'),
      rp = require('request-promise'),
      qs = require('querystring'),
      TwitterConfig = require('../../data/prod/twitter-config');


const getAccessToken = function(authData) {
  return new Promise((resolve, reject) => {
    const options_access_token = {
      uri: 'https://api.twitter.com/oauth/access_token',
      oauth: {
        consumer_key: TwitterConfig.consumer_key,
        consumer_secret: TwitterConfig.consumer_secret,
        token: authData.oauth_token,
        token_secret: authData.oauth_token_secret,
        verifier: authData.oauth_verifier
      }
    };

    rp(options_access_token).then((accessToken) => {
      resolve(accessToken);
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = getAccessToken;
