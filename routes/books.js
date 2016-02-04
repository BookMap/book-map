const router = require('express').Router();
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const mongoose = require( 'mongoose' );

function find (query, req, res, populateItem) {
  PhysicalBook.find(query)
              .populate(populateItem)
              .lean()
              .exec( (err, books) => {
                if(err) {
                          console.log(err);
                          return res.status(500).send(err[0]);
                        }
                res.send(books);
              })
}
//GET all physical books
router.get('/', (req, res, next) => {
  if (Object.keys(req.query).length === 0){
    find(req.query, req, res, 'unique_book');
  }
  else {
    next();
  }
});

//GET a user's physical book inventory
router.get('/', (req, res, next) => {
  if (req.query.owner && Object.keys(req.query).length === 1) {
    console.log(req.query);
    find(req.query, req, res, 'unique_book');
  }
  else {
    next();
  }
});

//GET all physical books of same unique book
router.get('/', (req, res, next) => {
  if (req.query.unique_book && Object.keys(req.query).length === 1) {
    find(req.query, req, res, 'owner');
  }
  else {
    next();
  }

});

module.exports = router;
