const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const Book = require('../models/Book');
const PhysicalBook = require('../models/PhysicalBook');
const mongoose = require( 'mongoose' );

router.use(bodyParser.json());


router.get('/lending', (req, res) => {
  PhysicalBook.find({
    user_id: req.user_id,
    borrower: {$gt: 0}
  })
  .then( books => {
    res.send(books);
  })
  .catch( err => {
    res.status(500).send(err);
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
    res.status(500).send(err);
  });
});

module.exports = router;
