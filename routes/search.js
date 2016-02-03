const router = require('express').Router();
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const mongoose = require( 'mongoose' );

router.get('/', (req, res, next) => {
  var queries = req.query;
  var searchTerms = Object.keys(queries);
  if (queries.search === 'books'){
    //GET all books
    if (searchTerms.length === 1){
      Book.find({}).lean().exec( (err, books) => {
        if(err) {
          console.log(err);
          return res.status(500).send(err[0]);
        }
        res.send(books);
      });
<<<<<<< HEAD
});

//GET all books by a specific user
router.get('/users/:user', (req, res, next) => {
  PhysicalBook.find({owner: req.params.user}).populate('unique_book borrower')
  .then( books => {
    res.send(books);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

//GET all books
router.get('/', (req, res, next) => {
  Book.find({}).populate('availability')
  .then( books => {
    res.send(books);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

//GET specific book
router.get('/:book_id', (req, res, next) => {
  Book.findById(req.params.book_id).lean().exec( (err, book) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err[0]);
||||||| merged common ancestors
});

//GET all books by a specific user
router.get('/users/:user', (req, res, next) => {
  PhysicalBook.find({owner: req.params.user}).populate('unique_book')
  .then( books => {
    res.send(books);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

//GET all books
router.get('/', (req, res, next) => {
  Book.find({}).lean().exec( (err, books) => {
    if(err) {
      console.log(err);
      return res.status(500).send(err[0]);
    }
    res.send(books);
  });
});

//GET specific book
router.get('/:book_id', (req, res, next) => {
  Book.findById(req.params.book_id).lean().exec( (err, book) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err[0]);
=======
    }
    else if (searchTerms.length === 2) {
      //GET a user's book inventory
      if (queries.userId) {
        PhysicalBook.find({owner: queries.userId}).populate('unique_book borrower')
        .then( books => {
          res.send(books);
        })
        .catch( err => {
          res.status(500).send(err[0]);
        });
      }
      //GET a specific unique book
      else if (queries.bookId) {
        Book.findById(queries.bookId).lean().exec( (err, book) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err[0]);
          }
          res.send(book);
        });
      }
      //handles all other unsupported BOOK queries
      else {
        res.status(404).send('search queries not supported');
      }
>>>>>>> 4dff552319b31fe4fcd635cdcb53a481d45283ae
    }
  }
  //GET all users
  else if (queries.search === 'users' && searchTerms.length === 1){
    User.find({})
          .lean()
          .exec( (err, users) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err[0]);
            }
            res.send(users);
          });
  }
  //handles all other unsupported queries
  else {
    res.status(404).send('search queries not supported');
  }
});

module.exports = router;
