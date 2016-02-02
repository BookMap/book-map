const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var subSchema = mongoose.Schema({
  user_id: {
    type: String,
    require: true
  }
},{ _id : false });

const Book = new Schema({
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require:true
  },
  availability: [subSchema]
});

Book.plugin(autoIncrement.plugin, { model: 'Book', field: '_id' });

module.exports = mongoose.model('Book', Book);
