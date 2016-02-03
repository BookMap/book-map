const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	_id: {
		type: Number,
		require: true
	},
	username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  about: String
	}, {
	id: false,
	_id: false
});

module.exports = mongoose.model( 'User', User );
