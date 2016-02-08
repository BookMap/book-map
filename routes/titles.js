const router = require('express').Router();
const Book = require('../models/Book');
const mongoose = require( 'mongoose' );
const PhysicalBook = require('../models/PhysicalBook');

function find (query, req, res, populateItem) {
  Book.find(query)
      .populate(populateItem)
      .lean()
      .exec( (err, books) => {
        if(err) {
                  return res.status(500).send(err[0]);
                }
        res.send(books);
      });
}

//GET all unique books
router.get('/', (req, res, next) => {
  if (Object.keys(req.query).length === 0){
    find(req.query, req, res, 'availability');
  }
  else {
    return next();
  }
});

//GET all unique books
router.get('/', (req, res, next) => {
  if (req.query.count && Object.keys(req.query).length === 1){
    const allbooks = Book.find()
                    .sort({_id: 1})
                    .lean()
                    .exec();
    const bookCount = PhysicalBook.aggregate()
                      .group( {_id: '$unique_book', count: { $sum: 1} })
                      .sort( {_id: 1} )
                      .exec();
    Promise.all( [allbooks, bookCount] )
    .then( result => {
        const bookTitles = result[0];
        const bookCounts = result[1];
        var i = 0;
        bookTitles.forEach( book => {
          var count = 0;
          if (book._id === bookCounts[i]._id) {
            count = bookCounts[i].count;
            if (i < bookCounts.length - 1) i++;
          }
          book.copies = count;
        });
        res.send(bookTitles);
    })
    .catch( err => {
      res.status(500).send(err);
    });
  }
  else {
    return next();
  }
});

//GET a specific unique book
router.get('/', (req, res, next) => {
  if (req.query._id && Object.keys(req.query).length === 1) {
    find(req.query, req, res, 'availability');
  }
  else {
    return next();
  }
});

router.delete('/:book_id', (req, res) => {
  Book.findOneAndRemove({
    _id: req.params.book_id
  })
  .then( () => {
    res.send('Success');
  })
  .catch( err => {
    res.status(500).send(err);
  });
});

router.patch('/:book_id', (req, res) => {
  var fields = {};
  if (req.body.title) { fields.title = req.body.title; }
  if (req.body.author) { fields.author = req.body.author; }
  if (req.body.summary) { fields.summary = req.body.summary; }
  Book.findOneAndUpdate({
    _id: req.params.book_id
  }, fields, {new: true})
  .then( book => {
    res.send(book);
  })
  .catch( err => {
    res.status(500).send('could not update book');
  });
});

module.exports = router;
