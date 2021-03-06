/*jshint esversion: 6 */
const User = require('../../models/users');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if(!user) {
      console.log('There is not user with this token');
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((err) => {
    res.send({
      authorized: false,
    });
  });
};

module.exports = authenticate;
