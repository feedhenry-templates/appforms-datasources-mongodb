var assert = require('assert');
var request = require('supertest');
var app = require('../../application.js');

exports['test returned months data'] = function (done) {
  request(app)
  .get('/assets').expect(200).end(function (err, response) {
    var body = response.body;

    assert(Array.isArray(body), 'response body should be an array');
    assert.equal(body[0].key, 0, 'first key is 0');
    assert.equal(body[0].value, 'Office Chairs', 'first value is Office Chairs');
    return done();
  });
};
