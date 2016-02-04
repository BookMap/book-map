const router = require('express').Router();
const Book = require('../models/Book');
const mongoose = require( 'mongoose' );

function find (query, req, res, populateItem) {
  Book.find(query)
      .populate(populateItem)
      .lean()
      .exec( (err, books) => {
        if(err) {
                  console.log(err);
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
