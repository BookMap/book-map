const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	username: {
    type: String,
    require: true
  },
  _id: {
    type: Number,
    require: true
  },
  email: {
    type: String,
    require: true
  }
}, {
	timestamps: true,
	strict: false // allow oauth ids and profiles
});

module.exports = mongoose.model( 'User', User );
