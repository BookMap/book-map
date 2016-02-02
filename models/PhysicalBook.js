const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhysicalBook = new Schema({
  book_id: {
    type: Number,
    require: true
  },
  user_id: {
    type: Number,
    require:true
  },
  borrower: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model('Physicalbook', PhysicalBook);
