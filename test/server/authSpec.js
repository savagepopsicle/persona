var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('supertest');
var server = require('../../server/server.js');

var superagent = require('superagent');
var agent = superagent.agent();
var theAccount = {
  "username": "John",
  "password": "test"
};

//TODO pending tests for logged users for browse and vote


describe('Authentication', function() {
  describe('Log In', function () {
    it('should return a 200 on succesful signin', function (done) {
        request(server)
          .post('/api/signin')
          .send({username: 'John', password: 'test'})
          .expect(200, done); //TODO: Add in check of return value
    });

    it('should return a 302 (redirection) on signin failure', function (done) {
        request(server)
          .post('/api/signin')
          .send({username: 'Nottoday', password: 'test'})
          .expect(302, done); //TODO: Add in check of return value
    });

    it('should create new session', function (done) { //TODO: Login and get browse, logout and get browse, unlogged in ever get browse
      request(server)
        .post('/api/signin')
        .send({username: 'John', password: 'test'})
        .end(function(err, res) {
          done();
        });
    });
  });


  describe('Log Out', function () {
    it('should not allow access to /api/browse if not logged in', function (done) {
      request(server)
        .post('/api/browse')
        .expect(401, done);
    });

   xit('should allow access to /api/browse if logged in', function (done) {
      request(server)
        .post('/api/signin')
        .send({username: 'John', password: 'test'})
        .end();
      request(server)
        .post('/api/browse')
        .expect(200, done);
    });

     it('should not allow access to /api/vote if not logged in', function (done) {
      request(server)
        .post('/api/vote')
        .expect(401, done);
    });
     xit('should allow access to /api/vote if logged in', function (done) {
      request(server)
        .post('/api/vote')
        .expect(401, done);
    });
  });
});