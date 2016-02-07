const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;

const app = require('../app');
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const token = process.env.TEST_TOKEN;
const userId = process.env.TEST_USERID;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

chai.use(chaiHttp);

var testBook;

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
      .get('/api/users')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.not.be.undefined;
        done();
      });
  });

  it('should return an array of books of a user', done => {
    request
      .get(`/api/books?owner=${userId}`)
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.not.be.undefined;
        done();
      });
  });

  it('should return an array of all physical books', done => {
    request
      .get('/api/books')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.not.be.undefined;
        done();
      });
  });

  it('should return an array of physical book searched by unique book Id', done => {
    request
      .get(`/api/books?unique_book=0`)
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(typeof res.body).to.be.object;
        done();
      });
  });

  it ('should return an array of all unique book titles', done => {
    request
      .get('/api/titles')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.not.be.undefined;
        done();
      });
  });
});

describe('Restricted Router', () => {

  const request = chai.request(app);

  it('should receive a status of 401 when token is not included when trying to access one of the restricted routes', done => {
    request
      .get('/api/profile/borrowing')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should be able to add a testing book', done => {
    request
      .post('/api/profile/books')
      .set('token', token)
      .send({
         'title': 'testing',
         'author': 'tester'
       })
       .end((err, res) => {
         expect(err).to.be.null;
         expect(res).to.have.status(200);
         expect(res.body).to.be.object;
         testBook = res.body;
         done();
       });
  });

  it('should receive an array of books being lent', done => {
    request
      .get('/api/profile/books?search=lending')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.not.be.undefined;
        done();
      });
  });

  it('should receive and array of books being borrowed', done => {
    request
      .get('/api/profile/books?search=borrowing')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.not.be.undefined;
        done();
      });
  });

  it('should successfully call PATCH to borrow a book', done => {
    request
      .patch(`/api/profile/books/${testBook._id}?request=borrow`)
      .set('token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.object;
        done();
      });
  });

  it('should successfully call PATCH to return a book', done => {
    request
      .patch(`/api/profile/books/${testBook._id}?request=return`)
      .set('token', token)
      .send({book_id: testBook._id, owner: userId})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.object;
        done();
      });
  });

  it('should successfully call DELETE to remove a book from a user inventory', done => {
    request
      .delete(`/api/profile/books/${testBook._id}`)
      .set('token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.object;
        done();
      });
  });

  it ('should successfully call GET for the requesting user profile', done => {
    request
      .get('/api/profile')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.object;
        done();
      });
  });
});
