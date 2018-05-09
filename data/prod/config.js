/*jshint esversion: 6 */
let SecretConfig = null;

if (!process.env.JWT_SECRET && !process.env.JWT_LOCAL_STORAGE) {
  SecretConfig = require('../secret/config.js');
}

const Config = {
  jwt_secret: process.env.JWT_SECRET || SecretConfig.jwt_secret,
  jwt_local_storage: process.env.JWT_LOCAL_STORAGE || SecretConfig.jwt_local_storage
};

module.exports = Config;
