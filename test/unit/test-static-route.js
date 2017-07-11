var assert = require('assert');
var request = require('supertest');
var proxyquire = require('proxyquire');

var corsMock = function () {
  return function (req, res, next) {

    return next();
  };
};
var mbaasApiStub = {
  mbaasExpress: function () {
    return {
      sys: function () {
        return function (req, res, next) { return next(); };
      },
      mbaas: function (req, res, next) {
        return next();
      },
      fhmiddleware: function () {
        return function (req, res, next) {
          return next();
        };
      },
      cloud: function () {
        return function (req, res, next) { return next(); };
      },
      errorHandler: function () {
        return function (req, res, next) { return next(); };
      }
    };
  },
  db: function (arg1, arg2) {
    var listView = {
      list: [{
        fields: {
          assets: require('../../lib/assets.json')
        }
      }]
    };
    arg2(null, listView);
  },
  '@global': true
};

var mocks = {
  'fh-mbaas-api': mbaasApiStub,
  './lib/bootstrapper': {
    bootstrapData: function () { return []; }
  }
};


var app = proxyquire('../../application.js', mocks);


exports['test returned assets data'] = function (done) {
  request(app)
    .get('/assets').expect(200).end(function (err, response) {
      var body = response.body;

      assert(Array.isArray(body), 'response body should be an array');
      assert.equal(body[0].assets[0], "Office Chairs", 'first value is Office Chairs');
      assert.equal(body[0].assets[1], 'Office Desks', 'second value is Office Desks');
      return done();
    });
};