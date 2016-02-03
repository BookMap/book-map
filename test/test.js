const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;

const app = require('../app');
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const token = process.env.TEST_TOKEN;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

chai.use(chaiHttp);


describe('Public Router', () => {
  before(done => {
    const db = mongoose.connection;
    mongoose.connect(process.env.DB_URI);
    db.on('open', () => {
      done();
    });
  });

  const request = chai.request(app);

  it('should be able to get a list of users', done => {
    request
      .get('/api/search/users')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.not.be.undefined;
        done();
      });
  });

  it('should return an array of books of a user', done => {
    request
      .get('/api/search/userBooks')
      .set('user', '0')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.not.be.undefined;
        done();
      });
  });

  it('should return an array of books', done => {
    request
      .get('/api/search')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.not.be.undefined;
        done();
      });
  });

  it('should return an object', done => {
    request
        .get('/api/search/0')
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(typeof res.body).to.be.object;
          done();
        });
  });
});

describe('Restricted Router', () => {
  it('should ')
});
