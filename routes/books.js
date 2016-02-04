const router = require('express').Router();
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const mongoose = require( 'mongoose' );

router.get('/', (req, res, next) => {
  var queries = req.query;
  if (Object.keys(queries).length === 0){
    PhysicalBook.find({}).lean().exec( (err, books) => {
          if(err) {
            console.log(err);
            return res.status(500).send(err[0]);
          }
          res.send(books);
        });
  }
  else {
    next();
  }
});

//GET a user's book inventory
router.get('/', (req, res, next) => {
  var queries = req.query;
  console.log('HERE');
  if (queries.owner && Object.keys(queries).length === 1) {
    PhysicalBook.find({owner: queries.owner})
                .populate('borrower')
                .lean()
                .exec( (err, books) => {
                  if(err) {
                    console.log(err);
                    return res.status(500).send(err[0]);
                  }
                  res.send(books);
                });
  }
  else {
    next();
  }
});

//GET all books of same unique book
router.get('/', (req, res, next) => {
  var queries = req.query;

});

module.exports = router;
