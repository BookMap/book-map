const router = require('express').Router();
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const mongoose = require( 'mongoose' );
const request = require('request');

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
        availability: [req.user_id]
      });
      return newBook.save();
    } else {
      book.availability.push(req.user_id);
      return book.save();
    }
  })
  .then( savedBook => {
    res.send(savedBook);
    var physicalBook = new PhysicalBook({
      unique_book: savedBook._id,
      owner: req.user_id
    });
    physicalBook.save();
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

router.get('/lending', (req, res) => {
  PhysicalBook.find({
    owner: req.user_id,
    borrower: {$gt: 0}
  }).populate('unique_book borrower').select('-_id -owner -__v')
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
  }).populate('owner unique_book').select('-_id -__v -borrower')
  .then( books => {
    res.send(books);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

router.delete('/delete', (req, res) => {
  PhysicalBook.findOneAndRemove({
    owner: req.user_id,
    unique_book: req.body.book_id
  })
  .then( book => {
    return book.populate('unique_book').execPopulate()
  })
  .then( book => {
    res.send(book);
    return Book.findById(req.body.book_id)
  })
  .then (book => {
    book.availability.pull(req.user_id);
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
    unique_book: req.body.book_id,
    owner: req.body.owner
  }, {
    borrower: req.user_id
  }, {new: true})
  .then( book => {
    return book.populate('unique_book owner').execPopulate()
  })
  .then( book => {
    res.send(book);
    return Book.findById(req.body.book_id)
  })
  .then( book => {
    book.availability.pull(req.body.owner);
    book.save();
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

router.patch('/return', (req, res) => {
  PhysicalBook.findOneAndUpdate({
    unique_book: req.body.book_id,
    owner: req.body.owner
  }, {
    borrower: 0
  }, {new: true})
  .then( book => {
    return book.populate('unique_book owner').execPopulate()
  })
  .then( book => {
    res.send(book);
    return Book.findById(req.body.book_id)
  })
  .then( book => {
    book.availability.push(req.body.owner);
    book.save();
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

router.get('/info', (req, res) => {
  User.findById(req.user_id)
  .then( user => {
    var info = {
      username: user.username,
      id: user._id
    };
    res.send(info);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

module.exports = router;
