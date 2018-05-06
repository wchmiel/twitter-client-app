/*jshint esversion: 6 */

const request = require('request'),
      rp = require('request-promise'),
      qs = require('querystring'),
      TwitterConfig = require('../../data/twitter-config');


const getRequestToken = function() {
  return new Promise((resolve, reject) => {

    const options_req_token = {
      uri: 'https://api.twitter.com/oauth/request_token',
      oauth: TwitterConfig
    };

    rp(options_req_token).then((requestToken) => {
      resolve(requestToken);
    }).catch((err) => {
      reject(err);
    });

  });
};

module.exports = getRequestToken;
