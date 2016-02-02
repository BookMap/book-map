const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const Book = new Schema({
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require:true
  },
  availability: [
    type: String
  ]
});

Book.plugin(autoIncrement.plugin, { model: 'Book', field: 'book_id' });

mongoose.model('Book', Book);
