const router = require('express').Router();
const Book = require('../models/Book');
const mongoose = require( 'mongoose' );

router.get('/', (req, res) => {
  if (req.admin) {
    res.send('success');
  } else {
    res.status(401).send('unauthorized');
  }
});

module.exports = router;
