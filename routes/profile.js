const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const mongoose = require( 'mongoose' );

router.use(bodyParser.json());

//POST new book
router.post('/addBook', (req, res, next) => {
  Book.findOne({
    title: req.body.title,
    author: req.body.author
  })
  .then( book => {
    console.log(req.user_id);
    if (!book) {
      var newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        availability: [{user_id: req.user_id}]
      });
      return newBook.save();
    } else {
      book.availability.push({user_id:req.user_id});
      return book.save();
    }
  })
  .then( savedBook => {
    var physicalBook = new PhysicalBook({
      book_id: savedBook._id,
      user_id: req.user_id,
      borrower: 0
    });
    return physicalBook.save();
  })
  .then( (savedBook)=> {
    res.send(savedBook);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

router.get('/lending', (req, res) => {
  PhysicalBook.find({
    user_id: req.user_id,
    borrower: {$gt: 0}
  })
  .then( books => {
    res.send(books);
  })
  .catch( err => {
    res.status(500).send(err);
  });
});

router.get('/borrowing', (req, res) => {
  PhysicalBook.find({
    borrower: req.user_id,
  })
  .then( books => {
    res.send(books);
  })
  .catch( err => {
    res.status(500).send(err);
  });
});

module.exports = router;
