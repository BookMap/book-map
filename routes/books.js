const router = require('express').Router();
const PhysicalBook = require('../models/PhysicalBook');
const mongoose = require( 'mongoose' );

function find (query, req, res, populateItem) {
  PhysicalBook.find(query)
              .populate(populateItem)
              .lean()
              .exec( (err, books) => {
                if(err) {
                          return res.status(500).send(err[0]);
                        }
                res.send(books);
              });
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
    find(req.query, req, res, 'unique_book borrower');
  }
  else {
    next();
  }
});

//GET all physical books of same unique book
router.get('/', (req, res, next) => {
  if (req.query.unique_book && Object.keys(req.query).length === 1) {
    find(req.query, req, res, 'owner unique_book');
  }
  else {
    next();
  }
});

module.exports = router;
