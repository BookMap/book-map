const router = require('express').Router();
const Book = require('../models/Book');
const mongoose = require( 'mongoose' );

router.post('/books/:book_id', (req, res) => {
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
