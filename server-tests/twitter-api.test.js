/*jshint esversion: 6 */

const getRequestToken = require('../helpers/twitter-api/get-request-token'),
      addTweet = require('../helpers/twitter-api/add-tweet'),
      getUserDataFromTwitter = require('../helpers/twitter-api/get-user'),
      getFollowersList = require('../helpers/twitter-api/get-followers-list'),
      getFriendsList = require('../helpers/twitter-api/get-friends-list'),
      getUserTimeline = require('../helpers/twitter-api/get-user-timeline');

const expect = require('expect');

const realAuthData = {
  tw_screen_name: '',
  tw_id_str: '',
  tw_oauth_token: '',
  tw_oauth_token_secret: ''
};

const fakeAuthData = {
  tw_screen_name: 'Test_Testowski',
  tw_id_str: '256759456831112342342344',
  tw_oauth_token: '706759456831115264-fFTHHFhPDCFhAg16x4dEr83jRMV8qsi',
  tw_oauth_token_secret: 'QdR1VjIVRxOyPqXFlkojIg1lZnMtRf5a2m6i4bzNlqAYq'
};

describe('Twitter Api requests', () => {

  describe('#get-request-token', () => {

    it('should get request token', (done) => {
      getRequestToken().then((requestToken) => {
        expect(requestToken)
        .toBeA('string')
        .toInclude('oauth_token')
        .toInclude('oauth_token_secret');
      }).then(done, done);
    });

  });

  describe('#get-followers-list', () => {

    it('should get array with followers objects', (done) => {
      getFollowersList(realAuthData, 5).then((followers) => {
        expect(followers.users[0])
        .toBeA('object')
        .toIncludeKeys(['profile_image_url', 'name', 'screen_name']);
      }).then(done, done);
    });

    it('should get 1 follower', (done) => {
      getFollowersList(realAuthData, 1).then((followers) => {
        expect(followers.users.length)
        .toBe(1);
      }).then(done, done);
    });

    it('should get error message', (done) => {
      getFollowersList(fakeAuthData, 1)
      .catch((error) => {}).then(done, done);
    });

  });

  describe('#get-friends-list', () => {

    it('should get array with friends objects', (done) => {
      getFriendsList(realAuthData).then((friends) => {
        expect(friends.users[0])
        .toBeA('object')
        .toIncludeKeys(['profile_image_url', 'name', 'screen_name']);
      }).then(done, done);
    });

    it('should get error message', (done) => {
      getFriendsList(fakeAuthData, 1)
      .catch((error) => {}).then(done, done);
    });

  });

  describe('#get-user-timeline', () => {

    it('should get array with tweets objects', (done) => {
      getUserTimeline(realAuthData, 5).then((tweets) => {
        expect(tweets[0])
        .toBeA('object')
        .toIncludeKeys(['created_at', 'text', 'user']);
      }).then(done, done);
    });

    it('should get user object in tweet object', (done) => {
      getUserTimeline(realAuthData, 5).then((tweets) => {
        expect(tweets[0].user)
        .toBeA('object')
        .toIncludeKeys(['profile_image_url', 'name', 'screen_name']);
      }).then(done, done);
    });

    it('should get 1 tweet', (done) => {
      getUserTimeline(realAuthData, 1).then((tweets) => {
        expect(tweets.length)
        .toBe(1);
      }).then(done, done);
    });

    it('should get error message', (done) => {
      getUserTimeline(fakeAuthData, 1)
      .catch((error) => {}).then(done, done);
    });

  });

  describe('#get-user', () => {

    it('should get user object', (done) => {
      getUserDataFromTwitter(realAuthData).then((user) => {
        expect(user)
        .toBeA('object')
        .toIncludeKeys(['profile_image_url', 'name', 'screen_name']);
      }).then(done, done);
    });

    it('should get error message', (done) => {
      getUserDataFromTwitter(fakeAuthData, 1)
      .catch((error) => {}).then(done, done);
    });

  });

  describe('#add-tweet', () => {

    it('should get error message', (done) => {
      addTweet(fakeAuthData, 'new test status')
      .catch((error) => {}).then(done, done);
    });

  });


});
