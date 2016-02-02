const bodyParser = require('body-parser');

const router = require('express').Router();
const Book = require('../models/Book');

router.use(bodyParser.json());

//GET all books
router.get('/search', (req, res, next) => {
  Book.find({}).lean().exec( (err, books) => {
    if(err) {
      console.log(err);
      return res.status(500).send(err[0]);
    }
    res.send(books);
  });
});
//GET specific book
router.get('/search/:book_id', (req, res, next) => {
  Book.findById(req.params.book_id).lean().exec( (err, book) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err[0]);
    }
    res.send(book);
  })
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
        res.send(savedBook);
      });
    }
    else {
      var bookToUpdate = books[0];
      bookToUpdate.availability.push({user_id:req.body.user_id});
      bookToUpdate.save( (err, savedBook) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err[0]);
        }
        res.send(savedBook);
      })
    }

  });//end of Book.find
});

module.exports = router;
