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
    next();
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
            i++;
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
    next();
  }
});

//GET a specific unique book
router.get('/', (req, res, next) => {
  if (req.query._id && Object.keys(req.query).length === 1){
    find(req.query, req, res, 'availability');
  }
  else {
    next();
  }
});
module.exports = router;
