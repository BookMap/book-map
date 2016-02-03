const router = require('express').Router();
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const mongoose = require( 'mongoose' );

//GET all users
router.get('/users', (req, res, next) => {
  User.find({})
      .lean()
      .exec( (err, users) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err[0]);
        }
        res.send(users);
      });
});

//GET all books by a specific user
router.get('/users/:user', (req, res, next) => {
  // PhysicalBook.find({user_id: req.headers.user})
  //             .then( books => {
  //               return Promise.all(
  //                 books.map( book => {
  //                   return Book.findOne({ _id: book.book_id})
  //                              .lean()
  //                 })
  //               );
  //             })
  //             .then( (books) => {
  //               res.send(books);
  //             })
  //             .catch(err => {
  //               console.log(err);
  //               res.status(500).send(err[0]);
  //             });
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
    }
    res.send(book);
  })
});


module.exports = router;
