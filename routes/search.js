const bodyParser = require('body-parser');

const router = require('express').Router();
const Book = require('../models/Book');

router.use(bodyParser.json());

//GET all books
router.get('/search', (req, res, next) => {
  res.send('API');
});


//POST new book
router.post('/addBook', (req, res, next) => {
  Book.find({}).lean().exec( (err, book) => {

    if(book.length === 0) {
      var newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        availability: [{user_id: req.body.user_id}]
      });

      newBook.save( (err, savedBook) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err[0]);
        }
        res.status(200).send('Book saved!');
      });
    }

  });//end of Book.find
});

module.exports = router;
