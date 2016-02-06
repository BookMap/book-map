const router = require('express').Router();
const Book = require('../models/Book');
const mongoose = require( 'mongoose' );

router.get('/', (req, res) => {
  console.log(req.admin);
  if (req.admin === true) {
    res.send('success');
  } else {
    res.status(401).send('unauthorized');
  }
});

module.exports = router;
