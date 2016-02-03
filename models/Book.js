const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const User = require('./User');

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
  availability: [{type: Number, ref: 'User'}]
});

Book.plugin(autoIncrement.plugin, { model: 'Book', field: '_id' });

module.exports = mongoose.model('Book', Book);
