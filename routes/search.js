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
  Book.find({}, (err, books) => {

    books = books.filter(book => {
      return (book.title === req.body.title && book.author === req.body.author);
    });

    if(books.length === 0) {
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
    else {
      var bookToUpdate = books[0];
      bookToUpdate.availability.push({user_id:req.body.user_id});
      bookToUpdate.save( (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err[0]);
        }
        res.status(200).send('Book saved!');
      })
    }

  });//end of Book.find
});

module.exports = router;
