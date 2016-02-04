const router = require('express').Router();
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const mongoose = require( 'mongoose' );
const request = require('request');

//POST new book
router.post('/books', (req, res) => {
  Book.findOne({
    title: req.body.title,
    author: req.body.author,
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
    var physicalBook = new PhysicalBook({
      comment: req.body.comment,
      unique_book: savedBook._id,
      owner: req.user_id
    });
    return physicalBook.save();
  })
  .then( savedBook => {
    return savedBook.populate('unique_book').execPopulate()
  })
  .then ( book => {
    res.send(book);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

router.get('/books', (req, res, next) => {
  if (req.query.search !== 'lending') {
    next();
  }
  PhysicalBook.find({
    owner: req.user_id,
    borrower: {$gt: 0}
  }).populate('unique_book borrower').select('-owner -__v')
  .then( books => {
    res.send(books);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

router.get('/books', (req, res, next) => {
  if (req.query.search !== 'borrowing') {
    next();
  }
  PhysicalBook.find({
    borrower: req.user_id,
  }).populate('owner unique_book').select('-__v -borrower')
  .then( books => {
    res.send(books);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

//must be the physical book id, not the unique book id
router.delete('/books/:book_id', (req, res, next) => {
  PhysicalBook.findOneAndRemove({
    _id: req.params.book_id
  })
  .then( book => {
    return book.populate('unique_book').execPopulate();
  })
  .then( book => {
    res.send(book);
    return Book.findById(book.unique_book._id);
  })
  .then (book => {
    book.availability.pull(req.user_id);
    book.save();
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

//edit profile info, ex. about or username
router.patch('/', (req, res) => {
  var fields = {};
  if (req.body.about) { fields.about = req.body.about; }
  if (req.body.username) { fields.username = req.body.username; }
  User.findOneAndUpdate({_id: req.user_id}, fields, {new: true})
  .then( user => {
    res.send(user);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

//book_id must be physical book id
router.patch('/books/:book_id', (req, res, next) => {
  if (req.query.request !== 'borrow') {
    next();
  }
  var owner;
  PhysicalBook.findOneAndUpdate({
    _id: req.params.book_id
  }, {
    borrower: req.user_id
  }, {new: true})
  .then( book => {
    return book.populate('unique_book owner').execPopulate();
  })
  .then( book => {
    res.send(book);
    owner = book.owner._id;
    return Book.findById(book.unique_book._id);
  })
  .then( book => {
    book.availability.pull(owner);
    book.save();
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

router.patch('/books/:book_id', (req, res, next) => {
  if (req.query.request !== 'return') {
    return next();
  }
  var owner;
  var updatedBook;
  PhysicalBook.findById(req.params.book_id)
  .then( book => {
    book.borrower = undefined;
    updatedBook = book;
    return book.save();
  })
  .then( () => {
    console.log(updatedBook);
    res.send(updatedBook);
    owner = updatedBook.owner;
    console.log(owner);
    return Book.findById(updatedBook.unique_book);
  })
  .then( book => {
    book.availability.push(owner);
    book.save();
  })
  .catch( err => {
    console.log(err);
    res.status(500).send(err);
  });
});

router.get('/', (req, res) => {
  User.findById(req.user_id)
  .then( user => {
    var info = {
      username: user.username,
      id: user._id,
      about: user.about
    };
    res.send(info);
  })
  .catch( err => {
    res.status(500).send(err[0]);
  });
});

module.exports = router;
