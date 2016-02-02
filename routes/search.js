const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const mongoose = require( 'mongoose' );

router.use(bodyParser.json());

//GET all books
router.get('/', (req, res, next) => {
  if (Object.keys(req.query).length === 0 ) {
    Book.find({}).lean().exec( (err, books) => {
      if(err) {
        console.log(err);
        return res.status(500).send(err[0]);
      }
      res.send(books);
    });
  }
  else {
    PhysicalBook.find({user_id: req.query.user})
                .lean()
                .exec( (err, books) => {
                  if(err) {
                    console.log(err);
                    return res.status(500).send(err[0]);
                  }
                  res.send(books);
                });
  }
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
