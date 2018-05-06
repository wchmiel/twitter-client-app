/*jshint esversion: 6 */

const request = require('supertest');
const expect = require('expect');
const {app} = require('../server');
const User = require('../models/users');
const saveUser = require('../helpers/db/save-user');

const fakeAuthData = {
  user_id: '256759456831112342342344',
  screen_name: 'Test_Testowski',
  oauth_token: '706759456831115264-fFTHHFhPDCFhAg16x4dEr83jRMV8qsi',
  oauth_token_secret: 'QdR1VjIVRxOyPqXFlkojIg1lZnMtRf5a2m6i4bzNlqAYq'
};

describe('SERVER', () => {

  describe('GET / ', () => {
    it('should return index.html with title TwitterClientApp as response', (done) => {
      request(app)
        .get('/')
        .expect((res) => {
          expect(res.text).toInclude('<title>TwitterClientApp</title>');
        })
        .end(done);
    });
  });

  describe('GET /check/authentication when user is unauthorized ', () => {
    it('should return authorized false', (done) => {
      request(app)
        .get('/check/authentication')
        .expect((res) => {
          expect(res.body).toInclude({
            authorized: false
          });
        })
        .end(done);
    });
  });

});


describe('DB', () => {

  beforeEach((done) => {
    User.remove({}).then(() => done());
  });

  it('should create a new user', (done) => {

    saveUser(fakeAuthData).then((user) => {
      User.find().then((usersFromDb) => {
        expect(usersFromDb.length).toBe(1);
        expect(usersFromDb[0].tw_id_str).toBe(fakeAuthData.user_id);
      }).catch((err) => done(err));
    }).then(done, done);

  });

});
