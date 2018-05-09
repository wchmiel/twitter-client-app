/*jshint esversion: 6 */

let SecretTwitterConfig = null;

if (!process.env.TW_CALLBACK && !process.env.TW_CONSUMER_KEY && !process.env.TW_CONSUMER_SECRET) {
  SecretTwitterConfig = require('../secret/twitter-config.js');
} else {
  SecretTwitterConfig = null;
}

const TwitterConfig = {
  callback: process.env.TW_CALLBACK || SecretTwitterConfig.callback,
  consumer_key: process.env.TW_CONSUMER_KEY || SecretTwitterConfig.consumer_key,
  consumer_secret: process.env.TW_CONSUMER_SECRET || SecretTwitterConfig.consumer_secret
};

module.exports = TwitterConfig;
