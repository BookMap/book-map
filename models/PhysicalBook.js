const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhysicalBook = new Schema({
  comment: String,
  unique_book: {type: Number, ref: 'Book'},
  owner: {type: Number, ref: 'User'},
  borrower: {type: Number, ref: 'User'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Physicalbook', PhysicalBook);
