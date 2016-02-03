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
    res.status(500).send(err[0]);
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
    res.status(500).send(err[0]);
  });
});

router.delete('/delete', (req, res) => {
  PhysicalBook.findOneAndRemove({
    user_id: req.user_id,
    book_id: req.body.book_id
  })
  .then( book => {
    res.send(book);
    return Book.findOne({ _id: req.body.book_id })
  })
  .then (book => {
    book.availability.pull({user_id: req.user_id});
    book.save();
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

router.post('/about', (req, res) => {
  User.findOneAndUpdate({_id: req.user_id}, {
    about: req.body.about
  }, {new: true})
  .then( user => {
    res.send(user);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

router.patch('/borrow', (req, res) => {
  PhysicalBook.findOneAndUpdate({
    book_id: req.body.book_id,
    user_id: req.body.user_id
  }, {
    borrower: req.user_id
  }, {new: true})
  .then( book => {
    res.send(book);
    return Book.findById(req.body.book_id)
  })
  .then( book => {
    book.availability.pull({user_id: req.body.user_id});
    book.save();
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

router.patch('/return', (req, res) => {
  PhysicalBook.findOneAndUpdate({
    book_id: req.body.book_id,
    user_id: req.body.user_id
  }, {
    borrower: 0
  }, {new: true})
  .then( book => {
    res.send(book);
    return Book.findById(req.body.book_id)
  })
  .then( book => {
    book.availability.push({user_id: req.body.user_id});
    book.save();
  })
  .catch( err => {
    res.status(500).send(err[0]);
  })
});


module.exports = router;
