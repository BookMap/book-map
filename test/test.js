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

  const request = chai.request(app);

  it('should be able to add a testing book', done => {
    request
      .post('/api/profile/addBook')
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
      .get('/api/profile/lending')
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
      .get('/api/profile/borrowing')
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
      .patch('/api/profile/borrow')
      .set('token', token)
      .send({book_id: testBook.book_id})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.object;
        done();
      });
  });

  it('should successfully call PATCH to return a book', done => {
    request
      .patch('/api/profile/return')
      .set('token', token)
      .send({book_id: testBook.book_id})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.object;
        done();
      });
  });

  it('should successfully call DELETE to remove a book from a user inventory', done => {
    request
      .delete('/api/profile/delete')
      .set('token', token)
      .send({book_id: testBook.book_id})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.object;
        done();
      });
  });
});
