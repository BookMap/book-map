const router = require('express').Router();
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const mongoose = require( 'mongoose' );

//GET a specific unique book
router.use('/', (req, res, next) => {
  var queries = req.query;
  if (Object.keys(queries).length === 0){
    Book.find({}).lean().exec( (err, books) => {
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
module.exports = router;
